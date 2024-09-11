"use client"
import React, { useState, useEffect } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SelectLabel } from "@radix-ui/react-select";

type FormData = {
  Date: string;
  "Weather Conditions": string;
  "Area Name": string;
  "Road/Intersection Name": string;
  "Roadwork and Construction Activity": string;
};

type Prediction = {
  traffic_level: string;
  additional_factors: { [key: string]: string };
};

type Options = {
  dates: string[];
  weatherConditions: string[];
  areaNames: string[];
  roadNames: string[];
};

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    Date: "",
    "Weather Conditions": "",
    "Area Name": "",
    "Road/Intersection Name": "",
    "Roadwork and Construction Activity": "No",
  });
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [options, setOptions] = useState<Options>({
    dates: [],
    weatherConditions: [],
    areaNames: [],
    roadNames: [],
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch("/api/dataset-options");
        const data: Options = await response.json();
        setOptions(data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/predict-traffic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data: Prediction = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-start gap-8 w-full min-h-svh px-[20px] py-[32px]">
      <Card className="flex p-6 flex-col items-start gap-8 self-stretch rounded-lg border border-[#E4E4E7] bg-white shadow-card">
        <CardHeader>
          <CardTitle>Bangalore Traffic Prediction</CardTitle>
          <CardDescription>
            Fill the Form to get the Prediction of Traffic in Selected Areas of
            Bangalore
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-start gap-5 w-full">
          <div className="flex w-full items-start gap-6">
            <Select onValueChange={(value) => handleChange("Date", value)}>
              <SelectTrigger className="flex items-center gap-3">
                <SelectValue placeholder="Select Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.dates.map((date) => (
                    <SelectItem key={date} value={date}>
                      {date}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                handleChange("Weather Conditions", value)
              }
            >
              <SelectTrigger className="flex items-center gap-3">
                <SelectValue placeholder="Select Weather Conditions" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.weatherConditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-full items-start gap-6">
            <Select onValueChange={(value) => handleChange("Area Name", value)}>
              <SelectTrigger className="flex items-center gap-3">
                <SelectValue placeholder="Select Area Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.areaNames.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                handleChange("Road/Intersection Name", value)
              }
            >
              <SelectTrigger className="flex items-center gap-3">
                <SelectValue placeholder="Select Road/Intersection Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.roadNames.map((road) => (
                    <SelectItem key={road} value={road}>
                      {road}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Select
            onValueChange={(value) =>
              handleChange("Roadwork and Construction Activity", value)
            }
          >
            <SelectTrigger className="flex items-center gap-3">
              <SelectValue placeholder="Roadwork and Construction Activity" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roadwork and Construction Activity</SelectLabel>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
        <Button
          className="bg-slate-950 text-white"
          variant="outline"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        {prediction && (
          <Card className="mt-4 w-full">
            <CardHeader>
              <CardTitle>Prediction Result</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">
                Traffic Level:{" "}
                <span className="text-blue-600">
                  {prediction.traffic_level}
                </span>
              </p>
              <h3 className="text-md font-semibold mt-4">
                Additional Factors:
              </h3>
              <ul className="list-disc list-inside">
                {Object.entries(prediction.additional_factors).map(
                  ([key, value]) => (
                    <li key={key}>
                      {key}: <span className="font-medium">{value}</span>
                    </li>
                  )
                )}
              </ul>
            </CardContent>
          </Card>
        )}
      </Card>
    </div>
  );
};

export default Page;
