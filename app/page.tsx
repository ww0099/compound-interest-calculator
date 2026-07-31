import { CompoundCalculator } from "@/components/compound-calculator"
import { JsonLdBreadcrumb, JsonLdHowTo } from "@/components/json-ld"

export default function Page() {
  return (
    <>
      <JsonLdBreadcrumb items={[
        { name: "Home", url: "https://top.net.im/" },
      ]} />
      <JsonLdHowTo
        name="How to Calculate Compound Interest"
        description="Learn how to use our free compound interest calculator to project investment growth. Follow these steps to calculate future value, solve for interest rate, or determine required monthly contributions."
        steps={[
          {
            name: "Select Calculation Mode",
            text: "Choose what you want to solve for: Future Value (how much you will have), Present Value (how much to invest now), Interest Rate (what return you need), Investment Period (how long it takes), or Monthly Contribution (how much to save each month).",
          },
          {
            name: "Enter Your Numbers",
            text: "Input your initial principal (starting amount), monthly contribution, annual interest rate, investment period in years, and choose your compounding frequency (annual, semiannual, quarterly, monthly, or daily). Optionally add inflation rate and capital gains tax rate for more realistic projections.",
          },
          {
            name: "Review Results",
            text: "The calculator instantly displays your nominal final balance, inflation-adjusted real balance, after-tax balance, total contributions, total interest earned, and effective annual rate (EAR). All results update in real-time as you adjust inputs.",
          },
          {
            name: "Analyze the Growth Chart",
            text: "The interactive chart shows your balance growth over time with three lines: total balance, total contributions, and real (inflation-adjusted) balance. Use compare mode to run two scenarios side by side.",
          },
          {
            name: "Save and Compare",
            text: "Your calculations are automatically saved to local history. Enable Compare Mode to analyze two different investment scenarios simultaneously with independent input groups.",
          },
        ]}
      />
      <CompoundCalculator />
    </>
  )
}
