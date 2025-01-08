import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

const accountHeads = [
  "Transportation",
  "Office maintenance",
  "Courier cost",
  "Stationary",
  "Food",
];

type AccountFormData = {
  date: string;
  accountType: string;
  head: string;
  amount: string;
};

type AccountHeadFormData = {
  status: "debit" | "credit";
  name: string;
};

const Accounting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register: registerAccount,
    handleSubmit: handleAccountSubmit,
    reset: resetAccountForm,
  } = useForm<AccountFormData>();

  const {
    register: registerHead,
    handleSubmit: handleHeadSubmit,
    reset: resetHeadForm,
  } = useForm<AccountHeadFormData>();

  const onAccountSubmit = (data: AccountFormData) => {
    console.log("Account Form Data:", data);
    resetAccountForm();
  };

  const onHeadSubmit = (data: AccountHeadFormData) => {
    console.log("Account Head Form Data:", data);
    setIsModalOpen(false);
    resetHeadForm();
  };
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 max-w-7xl mx-auto mt-20">
        <Card>
          <CardHeader>
            <CardTitle>Add Accounting</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleAccountSubmit(onAccountSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="date">Choose Date</Label>
                <Input
                  id="date"
                  type="date"
                  {...registerAccount("date", { required: true })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debit">Debit</SelectItem>
                    <SelectItem value="credit">Credit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="head">Choose Head</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select head" />
                  </SelectTrigger>
                  <SelectContent>
                    {accountHeads.map((head) => (
                      <SelectItem key={head} value={head.toLowerCase()}>
                        {head}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  {...registerAccount("amount", { required: true })}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600"
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Account Heads</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {accountHeads.map((head) => (
              <div
                key={head}
                className="rounded-lg bg-slate-100 px-4 py-2 text-sm"
              >
                {head}
              </div>
            ))}
            <Button
              variant="link"
              className="text-sky-500 hover:text-sky-600 p-0"
              onClick={() => setIsModalOpen(true)}
            >
              Add Accounts Head
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
  <DialogContent style={{ backgroundColor: "#F4FAFC" }}>
    <DialogHeader>
      <DialogTitle style={{ color: "#9E9E9E" }}>Add Account Head</DialogTitle>
    </DialogHeader>
    <hr className="my-2 border-t border-gray-300" />
    <form onSubmit={handleHeadSubmit(onHeadSubmit)} className="space-y-4">
      <RadioGroup defaultValue="debit" className="flex gap-8 w-full items-center justify-center ">
        <div className="flex items-center space-x-2 ">
          <RadioGroupItem value="debit" id="debit" {...registerHead("status", { required: true })}/>
          <Label htmlFor="debit" className="text-[16px]">Debit</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="credit" id="credit" {...registerHead("status", { required: true })} />
          <Label htmlFor="credit" className="text-[16px]">Credit</Label>
        </div>
      </RadioGroup>

      <div className="space-y-2">
        <Label htmlFor="headName">Type name here</Label>
        <Input
          id="headName"
          {...registerHead("name", { required: true })}
          placeholder="Enter head name"
        />
      </div>

      <Button type="submit" className="w-full bg-[#2397C8] text-white hover:bg-sky-600">
        Add Head
      </Button>
    </form>
  </DialogContent>
</Dialog>

    </>
  );
};

export default Accounting;
