import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import { useState } from "react";

const meta = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState("account");

    return (
      <Tabs className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            active={activeTab === "account"}
            onClick={() => setActiveTab("account")}
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            active={activeTab === "password"}
            onClick={() => setActiveTab("password")}
          >
            Password
          </TabsTrigger>
        </TabsList>
        {activeTab === "account" && (
          <TabsContent>
            <div className="p-4 border rounded mt-2">
              <h3 className="font-bold">Account</h3>
              <p className="text-sm text-gray-500">
                Make changes to your account here.
              </p>
            </div>
          </TabsContent>
        )}
        {activeTab === "password" && (
          <TabsContent>
            <div className="p-4 border rounded mt-2">
              <h3 className="font-bold">Password</h3>
              <p className="text-sm text-gray-500">
                Change your password here.
              </p>
            </div>
          </TabsContent>
        )}
      </Tabs>
    );
  },
};
