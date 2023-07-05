import { formatCurrency } from "@/app/_utils";

export function BusinessDocument() {
  const grandTotal = 0;
  const formattedGrandTotal = formatCurrency(grandTotal);
  const total = 0;
  const formattedTotal = formatCurrency(total);
  const withholdingTax = 0.03;
  const formattedWithholdingTax = `${withholdingTax * 100} %`;
  const amount = grandTotal * (1 - withholdingTax);
  const formattedAmount = formatCurrency(amount);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-12">
        <div className="col-span-6">
          <div className="flex flex-col">
            <label htmlFor="customerName">Customer Name</label>
            <br />
            <input type="text" name="customerName" placeholder="Name" />
          </div>
          <fieldset>
            <label htmlFor="customerAddress">Customer Address</label>
            <p className="w-full">Address</p>
            <p>Zip Code</p>
            <p>Customer Tax Id</p>
            <input
              type="text"
              className="w-1/2"
              name="customerBranch"
              required
              placeholder="Branch"
            />
          </fieldset>
        </div>
        <div className="col-span-3"></div>
        <div className="col-span-3">
          <h3 className="text-xl">Grand Total</h3>
          <p className="text-xl">{formattedGrandTotal}</p>

          <div>
            <label htmlFor="date">Date:</label>
            <input type="date" name="date" />
          </div>

          <div>
            <label htmlFor="date">Due Date:</label>
            <input type="date" name="date" />
          </div>

          <div>
            <label htmlFor="sale">Sale:</label>
            <input type="text" name="sale" />
          </div>
        </div>
      </div>
      <hr className="border-b border-slate-100" />
      <div className="flex flex-col">
        <label htmlFor="project">Project</label>
        <input type="text" name="project" />
      </div>

      <div className="flex flex-col">
        <label htmlFor="project">Detail</label>
        <input type="text" name="detail" />
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-9"></div>
        <div className="col-span-3 bg-slate-50">
          <div className="flex justify-between">
            <span className="font-semibold">Total</span>
            <span>{formattedTotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Withholding Tax</span>
            <span>{formattedWithholdingTax}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Amount</span>
            <span>{formattedAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
