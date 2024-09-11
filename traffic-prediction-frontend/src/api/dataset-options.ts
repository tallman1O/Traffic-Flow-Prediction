// pages/api/dataset-options.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

type DatasetOptions = {
  dates: string[];
  areaNames: string[];
  roadNames: string[];
  weatherConditions: string[];
};

// Define the type for a single record in the dataset
type TrafficRecord = {
  Date: string;
  'Area Name': string;
  'Road/Intersection Name': string;
  'Weather Conditions': string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DatasetOptions | { error: string }>
) {
  try {
    // Read the CSV file
    const filePath = path.join(process.cwd(), 'Banglore_traffic_Dataset.csv');
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Parse the CSV content
    const records: TrafficRecord[] = parse(fileContent, { columns: true, skip_empty_lines: true });

    // Extract unique values for each field
    const options: DatasetOptions = {
      dates: Array.from(new Set(records.map((record) => record.Date))),
      areaNames: Array.from(new Set(records.map((record) => record['Area Name']))),
      roadNames: Array.from(new Set(records.map((record) => record['Road/Intersection Name']))),
      weatherConditions: Array.from(new Set(records.map((record) => record['Weather Conditions']))),
    };

    res.status(200).json(options);
  } catch (error) {
    console.error('Error processing dataset:', error);
    res.status(500).json({ error: 'Failed to process dataset' });
  }
}
