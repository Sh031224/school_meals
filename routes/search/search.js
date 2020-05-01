const { key } = require("../../config/neisKey");
const axios = require("axios");

module.exports = async (req, res) => {
  const { school_name } = req.query;

  if (!school_name) {
    return res.status(400).json({
      status: 400,
      message: "검증 오류"
    });
  }

  const schoolApi = await axios.get("http://open.neis.go.kr/hub/schoolInfo", {
    params: {
      KEY: key,
      Type: "json",
      SCHUL_NM: school_name,
      pSize: 800
    }
  });

  // 학교 정보가 없을 때
  if (schoolApi.data.RESULT) {
    // 위의 if문 안할 시 Null pointer 오류
    if (schoolApi.data.RESULT.CODE !== "INFO-000") {
      return res.status(404).json({
        status: 404,
        message: "검색하신 학교 정보가 없습니다."
      });
    }
  }

  let schoolList = [];

  const data = schoolApi.data.schoolInfo;
  const listLength = parseInt(data[0].head[0].list_total_count);

  for (let i = 0; i < listLength; i++) {
    schoolList.push({
      school_name: data[1].row[i].SCHUL_NM, //학교 이름
      school_locate: data[1].row[i].ORG_RDNMA, //도로명 주소
      office_code: data[1].row[i].ATPT_OFCDC_SC_CODE, //시도 교육청 코드
      school_id: data[1].row[i].SD_SCHUL_CODE //표준 학교 코드
    });
  }

  return res.status(200).json({
    status: 200,
    message: "학교 조회 성공",
    data: {
      schoolList
    }
  });
};
