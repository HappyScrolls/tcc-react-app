import React, { Suspense } from "react";
import ScheduleDetail from "./components/ScheduleDetail";

const SchedulePage = () => {
  const scheduleNo = 1;

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ScheduleDetail scheduleNo={scheduleNo} />
      </Suspense>
    </div>
  );
};

export default SchedulePage;
