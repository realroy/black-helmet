export const TH_NUMBER_MAP = {
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

export const TH_DIGITS = [
  "หน่วย",
  "สิบ",
  "ร้อย",
  "พัน",
  "หมื่น",
  "แสน",
  "ล้าน",
] as const;

export const TH_SUFFIX = "บาทถ้วน";

export function toThaiCurrencyPronuciation(num: number) {
  const splittedNum = num.toString().split("");
  const length = splittedNum.length;
  const result = splittedNum
    .map((num, index) => {
      if (num === "0") {
        return;
      }

      const thNumber = TH_NUMBER_MAP[num as keyof typeof TH_NUMBER_MAP];
      const thDigit = TH_DIGITS[length - index - 1];

      return `${thNumber}${thDigit}`;
    })
    .join("");

  return result + TH_SUFFIX;
}
