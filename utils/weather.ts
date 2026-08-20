// weatherInfo는 자유 문장이라("Bangkok 현지 기후: 기온 27.3°C, ... (우천/스콜 예상)")
// 온도/날씨 요약만 정규식으로 뽑아 씁니다.
export function parseWeatherInfo(weatherInfo: string) {
  const tempMatch = weatherInfo.match(/기온\s*([\d.]+)\s*°C/);
  const conditionMatch = weatherInfo.match(/\(([^)]+)\)/);
  return {
    temp: tempMatch ? Math.round(Number(tempMatch[1])) : null,
    condition: conditionMatch ? conditionMatch[1] : null,
  };
}
