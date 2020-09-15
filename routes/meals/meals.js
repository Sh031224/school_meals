const axios = require("axios");
const { key } = require("../../config/neisKey");
const dateFormat = require("dateformat");

exports.getMeals = async (req, res) => {
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

  const mealsApi = await axios.get(
    "http://open.neis.go.kr/hub/mealServiceDietInfo",
    {
      params: {
        KEY: key,
        Type: "json",
        SD_SCHUL_CODE: school_id,
        ATPT_OFCDC_SC_CODE: office_code,
        MLSV_YMD: date
      }
    }
  );

  if (mealsApi.data.RESULT) {
    if (mealsApi.data.RESULT !== "INFO-000") {
      return res.status(404).json({
        status: 404,
        message: "급식 정보가 존재하지 않습니다."
      });
    }
  }

  let meal = [];
  let calories = [];

  const mealData = mealsApi.data.mealServiceDietInfo[1].row;

  for (let i = 0; i < mealData.length; i++) {
    let mealNum;
    try {
      mealNum = parseInt(mealData[i].MMEAL_SC_CODE) - 1;
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "서버 오류"
      });
    }
    meal[mealNum] = mealData[i].DDISH_NM.replace(/([0-9])+\./g, "");
    calories[mealNum] = mealData[i].CAL_INFO;
    if (!calories[i]) {
      calories[i] = null;
    }
    if (!meal[i]) {
      meal[i] = null;
    }
  }

  return res.status(200).json({
    status: 200,
    message: "급식 조회 성공",
    data: {
      meal,
      calories
    }
  });
};

exports.getTodayMeals = async (req, res) => {
  const { school_id } = req.query;
  const { office_code } = req.query;
  const today = dateFormat(new Date(), "yyyymmdd");

  if (!school_id || !office_code) {
    return res.status(400).json({
      status: 400,
      message: "검증 오류"
    });
  }

  const mealsApi = await axios.get(
    "http://open.neis.go.kr/hub/mealServiceDietInfo",
    {
      params: {
        KEY: key,
        Type: "json",
        SD_SCHUL_CODE: school_id,
        ATPT_OFCDC_SC_CODE: office_code,
        MLSV_YMD: today
      }
    }
  );

  if (mealsApi.data.RESULT) {
    if (mealsApi.data.RESULT !== "INFO-000") {
      return res.status(404).json({
        status: 404,
        message: "급식 정보가 존재하지 않습니다."
      });
    }
  }

  let meal = [];
  let calories = [];

  const mealData = mealsApi.data.mealServiceDietInfo[1].row;

  for (let i = 0; i < mealData.length; i++) {
    let mealNum;
    try {
      mealNum = parseInt(mealData[i].MMEAL_SC_CODE) - 1;
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "서버 오류"
      });
    }
    meal[mealNum] = mealData[i].DDISH_NM.replace(/([0-9])+\./g, "");
    calories[mealNum] = mealData[i].CAL_INFO;
    if (!calories[i]) {
      calories[i] = null;
    }
    if (!meal[i]) {
      meal[i] = null;
    }
  }

  return res.status(200).json({
    status: 200,
    message: "급식 조회 성공",
    data: {
      meal,
      calories
    }
  });
};
