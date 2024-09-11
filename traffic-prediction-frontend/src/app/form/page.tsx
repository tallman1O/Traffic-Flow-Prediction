import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
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

const page = () => {
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

        <div className="flex flex-col items-start gap-5 w-full">
          <div className="flex w-full items-start gap-6">
            <Select>
              <SelectTrigger className="flex items-center gap-3">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="flex items-center gap-3">
                <SelectValue placeholder="Select Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="date">2022-01-01</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="flex items-center gap-3">
                <SelectValue placeholder="Select Weather Conditions" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="weather">Sunny</SelectItem>
                  <SelectItem value="weather">Rainy</SelectItem>
                  <SelectItem value="weather">Cloudy</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-full items-start gap-6">
            <Select>
              <SelectTrigger className="flex items-center gap-3">
                <SelectValue placeholder="Select Area Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="area-1">Sunny</SelectItem>
                  <SelectItem value="area-2">Rainy</SelectItem>
                  <SelectItem value="area-3">Cloudy</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="flex items-center gap-3">
                <SelectValue placeholder="Select Road/Intersection Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="road-1">Sunny</SelectItem>
                  <SelectItem value="road-2">Rainy</SelectItem>
                  <SelectItem value="road-3">Cloudy</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="bg-slate-950 text-white" variant="outline">Submit</Button>
      </Card>
    </div>
  );
};

export default page;
