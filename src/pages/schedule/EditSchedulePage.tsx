import {useQueryClient} from '@tanstack/react-query';
import React, {Suspense} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {CoupleInfo} from '../../types/ICoupleInfo';
import AddScheduleHeader from './components/AddScheduleHeader';
import ScheduleForm from './components/ScheduleForm';
import {ScheduleData} from '../../types/ISchedule';
import {formatDateHyphen} from '../../utils/date';

const EditSchedulePage = () => {
    const location = useLocation();
    const {schedule, isCoupleSchedule}: { schedule: ScheduleData; isCoupleSchedule: boolean } =
        location.state;
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const coupleInfo = queryClient.getQueryData<CoupleInfo>(["coupleInfo"]);

    console.log(schedule)
    const handleSave = (formData: ScheduleData) => {
        console.log("수정된 데이터:", formData);
        alert("수정 완료")
        // API 호출
        navigate(-1);
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AddScheduleHeader selectedDate={formatDateHyphen(schedule.scheduleStartAt)} coupleInfo={coupleInfo}/>
            <ScheduleForm
                onSave={handleSave}
                initialFormData={schedule}
                isCoupleSchedule={isCoupleSchedule}
            />
        </Suspense>
    );
};

export default EditSchedulePage;
