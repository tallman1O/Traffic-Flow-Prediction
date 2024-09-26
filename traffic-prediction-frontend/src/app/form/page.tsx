"use client";
import React, { useState } from "react";
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
import { Loader2 } from "lucide-react"; 

type FormData = {
  "Weather Conditions": string;
  "Area Name": string;
  "Road/Intersection Name": string;
  "Roadwork and Construction Activity": string;
};

type Prediction = {
  traffic_level: string;
  additional_factors: { [key: string]: string };
};

const options = {
  areaNames: [
    "Indiranagar",
    "Whitefield",
    "Koramangala",
    "M.G. Road",
    "Jayanagar",
    "Hebbal",
    "Yeshwanthpur",
    "Electronic City",
  ],
  roadNames: [
    "100 Feet Road",
    "CMH Road",
    "Marathahalli Bridge",
    "Sony World Junction",
    "Sarjapur Road",
    "Trinity Circle",
    "Anil Kumble Circle",
    "Jayanagar 4th Block",
    "South End Circle",
    "Hebbal Flyover",
    "Ballari Road",
    "Yeshwanthpur Circle",
    "Tumkur Road",
    "ITPL Main Road",
    "Silk Board Junction",
    "Hosur Road",
  ],
  weatherConditions: ["Clear", "Overcast", "Fog", "Rain", "Windy"],
};

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    "Weather Conditions": "",
    "Area Name": "",
    "Road/Intersection Name": "",
    "Roadwork and Construction Activity": "No",
  });

  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false); 
  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true); 
    try {
      const response = await fetch("/api/predict-traffic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false once the request completes
    }
  };

  return (
    <div className="flex flex-col items-start gap-8 w-full min-h-svh px-[20px] py-[32px]">
      <Card className="flex p-6 flex-col items-start gap-8 self-stretch rounded-lg border border-[#E4E4E7] bg-white shadow-card">
        <CardHeader>
          <CardTitle>Bangalore Traffic Prediction</CardTitle>
          <CardDescription>
            Fill the form to get the prediction of traffic in selected areas of
            Bangalore
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-start gap-5 w-full">
          <div className="flex w-full items-start gap-6">
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
        </CardContent>

        {/* Button with loading indicator */}
        <Button
          className="bg-slate-950 text-white"
          variant="outline"
          onClick={handleSubmit}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </>
          ) : (
            "Submit"
          )}
        </Button>

        {prediction && (
          <Card className="mt-4 w-full">
            <CardHeader className="p-6">
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
