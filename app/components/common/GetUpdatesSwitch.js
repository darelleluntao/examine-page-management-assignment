"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";

const GetUpdatesSwitch = ({ isChecked, onGetUpdate }) => {
  return (
    <div className="float-end">
      <Switch checked={isChecked} onCheckedChange={onGetUpdate} />
    </div>
  );
};

export default GetUpdatesSwitch;
