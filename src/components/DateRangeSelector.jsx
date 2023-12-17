import { useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { format } from "date-fns";
import { addYears } from "date-fns";
const { RangePicker } = DatePicker;

const DateRangeSelector = ({ onChange }) => {
  const dateFormat = "DD/MM/YYYY";

  const handleDateChange = (dates) => {
    if (dates === null) return onChange(undefined, undefined);
    const startDate = format(dates[0]["$d"], "dd/MM/yyyy", {
      timeZone: "Asia/Kolkata",
    });
    const endDate = format(dates[1]["$d"], "dd/MM/yyyy", {
      timeZone: "Asia/Kolkata",
    });
    onChange(startDate, endDate);
  };

  return (
    <div className="p-10 flex flex-col items-center justify-center ">
      <label className="mb-2 text-sm font-medium text-gray-600">Date</label>
      <div className="w-80">
        <RangePicker
          onChange={(dates) => handleDateChange(dates)}
          format={dateFormat}
        />
      </div>
    </div>
  );
};

export default DateRangeSelector;
