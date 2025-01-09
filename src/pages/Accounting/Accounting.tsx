/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  useAddAccountMutation,
  useAddHeadMutation,
  useGetAccountHeadQuery,
} from "@/redux/api/auth/userData";
import { toast } from "sonner";

interface AccountHead {
  id: string;
  name: string;
}


const Accounting = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const [addAccount] = useAddAccountMutation();
  const [addHead] = useAddHeadMutation();

  
  const { data: headData } = useGetAccountHeadQuery(undefined);
  console.log(headData?.data);


  const accountHeads =
    headData?.data?.map((head: any) => ({
      id: head._id,
      name: head.headName, 
    })) || [];

  const [formData, setFormData] = useState({
    date: "",
    accountType: "",
    accountHead: "",
    amount: "",
  });

  const [errors, setErrors] = useState({
    date: "",
    accountType: "",
    accountHead: "",
    amount: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFormData, setModalFormData] = useState({
    accountType: "debit", 
    headName: "",
  });

 
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  const handleModalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModalFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleModalSelectChange = (value: string) => {
    setModalFormData((prevData) => ({ ...prevData, accountType: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

 
    const formErrors = { ...errors };

    if (!formData.date) formErrors.date = "Date is required";
    else formErrors.date = "";

    if (!formData.accountType)
      formErrors.accountType = "Account type is required";
    else formErrors.accountType = "";

    if (!formData.accountHead) formErrors.accountHead = "Head is required";
    else formErrors.accountHead = "";

    if (!formData.amount) formErrors.amount = "Amount is required";
    else formErrors.amount = "";

    setErrors(formErrors);

    
    if (!Object.values(formErrors).some((error) => error !== "")) {
      console.log("Form Data Submitted:", formData);

      const accountInfo = {
        ...formData,
        employeeId: user?.employeeId,
      };

      console.log(accountInfo)
      const res = await addAccount(accountInfo);
      console.log(res.data.success);
      if(res.data.success){
        toast.success("Successfully added.",{ duration: 2000})
      }


      

   
      setFormData({
        date: "",
        accountType: "",
        accountHead: "",
        amount: "",
      });
    }
  };

  const handleModalFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  
    if (!modalFormData.headName) {
      alert("Account head name is required");
      return;
    }

    
    console.log("New Account Head:", modalFormData);
    const headInfo = {
      ...modalFormData,
    };

   
    const res = await addHead(headInfo);
    
    if(res.data.success){
      toast.success("Account Head added successfully.",{ duration: 2000})
    }

    
    setIsModalOpen(false);
    setModalFormData({ accountType: "debit", headName: "" });
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 max-w-7xl mx-auto mt-20">
        
        <Card>
          <CardHeader>
            <CardTitle>Add Accounting</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Date Input */}
              <div className="space-y-2">
                <Label htmlFor="date">Choose Date</Label>
                <Input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
                {errors.date && (
                  <span className="text-red-500">{errors.date}</span>
                )}
              </div>

             
              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type</Label>
                <Select
                  value={formData.accountType}
                  onValueChange={(value) =>
                    handleSelectChange("accountType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-black rounded-md shadow-lg">
                    <SelectItem value="debit" className="hover:bg-gray-200">
                      Debit
                    </SelectItem>
                    <SelectItem value="credit" className="hover:bg-gray-200">
                      Credit
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.accountType && (
                  <span className="text-red-500">{errors.accountType}</span>
                )}
              </div>

              
              <div className="space-y-2">
                <Label htmlFor="accountHead">Choose Head</Label>
                <Select
                  value={formData.accountHead}
                  onValueChange={(value) =>
                    handleSelectChange("accountHead", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select head" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-black rounded-md shadow-lg">
                    {accountHeads.map((accountHead: AccountHead) => (
                      <SelectItem
                        key={accountHead.name}
                        value={accountHead.name}
                        className="hover:bg-gray-200"
                      >
                        {accountHead.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.accountHead && (
                  <span className="text-red-500">{errors.accountHead}</span>
                )}
              </div>

             
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                />
                {errors.amount && (
                  <span className="text-red-500">{errors.amount}</span>
                )}
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
            {accountHeads.map((head: any) => (
              <div
                key={head.id}
                className="rounded-lg bg-slate-100 px-4 py-2 text-sm"
              >
                {head.name}
              </div>
            ))}
            <Button
              variant="link"
              className="text-sky-500 hover:text-sky-600 p-0"
              onClick={() => setIsModalOpen(true)}
            >
              Add Account Head
            </Button>
          </CardContent>
        </Card>
      </div>


      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent style={{ backgroundColor: "#F4FAFC" }}>
          <DialogHeader>
            <DialogTitle style={{ color: "#9E9E9E" }}>
              Add Account Head
            </DialogTitle>
          </DialogHeader>
          <hr className="my-2 border-t border-gray-300" />
          <form onSubmit={handleModalFormSubmit} className="space-y-4">
            
            <RadioGroup
              value={modalFormData.accountType}
              onValueChange={handleModalSelectChange}
              className="flex gap-8 w-full items-center justify-center"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="debit" id="debit" />
                <Label htmlFor="debit" className="text-[16px]">
                  Debit
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit" id="credit" />
                <Label htmlFor="credit" className="text-[16px]">
                  Credit
                </Label>
              </div>
            </RadioGroup>

          
            <div className="space-y-2">
              <Label htmlFor="headName">Type name here</Label>
              <Input
                id="headName"
                name="headName"
                placeholder="Enter head name"
                value={modalFormData.headName}
                onChange={handleModalInputChange}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#2397C8] text-white hover:bg-sky-600"
            >
              Add Head
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Accounting;
