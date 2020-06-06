const axios = require("axios");
const { key } = require("../../config/neisKey");
const dateFormat = require("dateformat");

exports.getSchedule = async (req, res) => {
  const { school_id } = req.query;
  const { office_code } = req.query;
  let { date } = req.query;
  date = dateFormat(date, "yyyymmdd");

  if (!school_id || !office_code) {
    return res.status(400).json({
      status: 400,
      message: "검증 오류"
    });
  }

  const scheduleApi = await axios.get(
    "http://open.neis.go.kr/hub/SchoolSchedule",
    {
      params: {
        KEY: key,
        Type: "json",
        SD_SCHUL_CODE: school_id,
        ATPT_OFCDC_SC_CODE: office_code,
        AA_YMD: date
      }
    }
  );

  if (scheduleApi.data.RESULT) {
    if (scheduleApi.data.RESULT !== "INFO-000") {
      return res.status(404).json({
        status: 404,
        message: "학사 일정이 없습니다."
      });
    }
  }

  const scheduleData = scheduleApi.data.SchoolSchedule[1].row;
  let scheduleList = [];

  for (let i = 0; i < scheduleData.length; i++) {
    scheduleList.push({
      name: scheduleData[i].EVENT_NM,
      data: scheduleData[i].AA_YMD
    });
  }

  return res.status(200).json({
    status: 200,
    message: "일정 조회 성공",
    data: {
      scheduleList
    }
  });
};

exports.getTodaySchedule = async (req, res) => {
  const { school_id } = req.query;
  const { office_code } = req.query;
  const date = dateFormat(new Date(), "yyyymmdd");

  if (!school_id || !office_code) {
    return res.status(400).json({
      status: 400,
      message: "검증 오류"
    });
  }

  const scheduleApi = await axios.get(
    "http://open.neis.go.kr/hub/SchoolSchedule",
    {
      params: {
        KEY: key,
        Type: "json",
        SD_SCHUL_CODE: school_id,
        ATPT_OFCDC_SC_CODE: office_code,
        AA_YMD: date
      }
    }
  );

  if (scheduleApi.data.RESULT) {
    if (scheduleApi.data.RESULT !== "INFO-000") {
      return res.status(404).json({
        status: 404,
        message: "학사 일정이 없습니다."
      });
    }
  }

  const scheduleData = scheduleApi.data.SchoolSchedule[1].row;
  let scheduleList = [];

  for (let i = 0; i < scheduleData.length; i++) {
    scheduleList.push({
      name: scheduleData[i].EVENT_NM,
      data: scheduleData[i].AA_YMD
    });
  }

  return res.status(200).json({
    status: 200,
    message: "일정 조회 성공",
    data: {
      scheduleList
    }
  });
};
