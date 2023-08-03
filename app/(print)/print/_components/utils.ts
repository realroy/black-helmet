const TH_NUMBER_MAP = {
  "0": "",
  "1": "หนึ่ง",
  "2": "สอง",
  "3": "สาม",
  "4": "สี่",
  "5": "ห้า",
  "6": "หก",
  "7": "เจ็ด",
  "8": "แปด",
  "9": "เก้า",
} as const;

const TH_DIGITS = [
  "หน่วย",
  "สิบ",
  "ร้อย",
  "พัน",
  "หมื่น",
  "แสน",
  "ล้าน",
] as const;

export function toThaiCurrencyPronuciation(num: number) {
  return num
    .toString()
    .split("")
    .reduceRight((previousValue, currentValue, currentIndex) => {
      if (!(currentValue in TH_NUMBER_MAP)) {
        return previousValue;
      }

      const thNumber =
        TH_NUMBER_MAP[currentValue as keyof typeof TH_NUMBER_MAP];

      if (currentIndex === 0) {
        return [thNumber, previousValue].join("");
      }

      if (currentIndex <= 6) {
        return [thNumber, TH_DIGITS[currentIndex], previousValue].join("");
      }

      const result = [thNumber] as string[];

      for (let digit = currentIndex; digit > 0; digit /= 6) {
        const modedDigit = digit % 6;

        if (modedDigit === 0) {
          result.push(TH_DIGITS[6]);
          continue;
        }

        result.push(TH_DIGITS[modedDigit]);
      }

      result.push(previousValue);

      return result.join("");
    }, "บาทถ้วน");
}
