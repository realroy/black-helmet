"use client";

import { formatCurrency } from "@/app/_utils";
import { useEffect } from "react";

import type { Quotation } from "@/types";

type Props = {
  document: Partial<Quotation>;
};

export function PrintableBussinessDocument({ document }: Props) {
  useEffect(() => {
    window.print();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <p>{document?.sellerName}</p>
            <p>Seller Address</p>
            <p>Seller Tax ID</p>
            <p>Seller Tel no</p>
          </div>

          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 24, textAlign: "center" }}>ใบเสนอราคา</h1>
            <div style={{ height: "1rem" }}></div>
            <table
              style={{ width: "100%", borderTop: "2px solid rgba(0,0,0,0.3)" }}
            >
              <tbody>
                <tr>
                  <th style={{ paddingTop: "1rem" }}>เลขที่</th>
                  <td style={{ paddingTop: "1rem" }}>{document?.documentNo}</td>
                </tr>
                <tr>
                  <th>วันที่</th>
                  <td>{document?.issueDate?.toLocaleDateString("th")}</td>
                </tr>
                <tr>
                  <th>ผู้ขาย</th>
                  <td>{document?.sellerName}</td>
                </tr>
                <div style={{ height: "1rem" }}></div>
                <tr style={{ borderTop: "2px solid rgba(0,0,0,0.3)" }}>
                  <th style={{ paddingTop: "1rem" }}>ชื่องาน</th>
                  <td style={{ paddingTop: "1rem" }}>
                    {document?.projectName}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: "bold", marginTop: "1rem" }}>ลูกค้า</p>
            <p>
              {document?.customerName} ({document?.customerBranch})
            </p>
            <p>{document?.customerAddress}</p>
            <p>เลขประจำตัวผู้เสียภาษี {document?.customerTaxId}</p>
          </div>

          <div style={{ flex: 1 }}></div>
        </div>

        <table
          style={{
            width: "100%",
            marginTop: "1rem",
            borderTop: "2px solid rgba(0,0,0,0.3)",
            borderBottom: "2px solid rgba(0,0,0,0.3)",
          }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>รายละเอียด</th>
              <th>จำนวน</th>
              <th>ราคาต่อหน่วย</th>
              <th>ยอดรวม</th>
            </tr>
          </thead>
          <tbody>
            {document?.products?.map?.((product, index) => (
              <tr
                key={index}
                style={{ borderTop: "2px solid rgba(0,0,0,0.3)" }}
              >
                <td style={{ textAlign: "center" }}>{index + 1}</td>
                <td style={{ textAlign: "center" }}>{product.name}</td>
                <td style={{ textAlign: "center" }}>
                  {product.quantity} {product.unit}
                </td>
                <td style={{ textAlign: "center" }}>
                  {formatCurrency(product.unitPrice)}
                </td>
                <td style={{ textAlign: "center" }}>
                  {formatCurrency(product.quantity * product.unitPrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1 }}>(บาทถ้วน)</div>
          <div style={{ flex: 1 }}>
            <table
              style={{
                width: "100%",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <tbody>
                <tr>
                  <th style={{ textAlign: "right" }}>รวมเป็นเงิน</th>
                  <td></td>
                  <td>{document?.subTotal}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "right" }}>จำนวนเงินรวมทั้งหมด</th>
                  <td></td>
                  <td>{document?.grandTotal}</td>
                </tr>

                <tr>
                  <td colSpan={3}>
                    <div
                      style={{
                        padding: "0.5rem 0",
                        borderTop: "2px solid rgba(0,0,0,0.3)",
                      }}
                    ></div>
                  </td>
                </tr>

                <tr>
                  <th style={{ textAlign: "right" }}>
                    หักภาษี ณ ที่จ่าย {document?.withholdingTax}%
                  </th>
                  <td></td>
                  <td>
                    {+(document?.grandTotal ?? 0) *
                      +(document?.withholdingTax ?? 0)}
                  </td>
                </tr>
                <tr>
                  <th style={{ textAlign: "right" }}>ยอดชำระ</th>
                  <td></td>
                  <td>{document?.paymentAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: 1, marginRight: "4rem" }}>
          <p>ในนาม {document?.customerName}</p>
          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "space-between",
              textAlign: "center",
              marginTop: "8rem",
            }}
          >
            <p
              style={{
                flex: 1,
                borderTop: "1px solid rgba(0,0,0,0.3)",
                marginRight: "2rem",
                paddingTop: "1rem",
              }}
            >
              ผู้รับสั่งซื้อสินค้า
            </p>

            <p
              style={{
                flex: 1,
                borderTop: "1px solid rgba(0,0,0,0.3)",
                paddingTop: "1rem",
              }}
            >
              วันที่
            </p>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ textAlign: "right" }}>ในนาม {document?.sellerName}</p>
          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "space-between",
              textAlign: "center",
              marginTop: "8rem",
            }}
          >
            <p
              style={{
                flex: 1,
                borderTop: "1px solid rgba(0,0,0,0.3)",
                marginRight: "2rem",
                paddingTop: "1rem",
              }}
            >
              ผู้อนุมัติ
            </p>

            <p
              style={{
                flex: 1,
                borderTop: "1px solid rgba(0,0,0,0.3)",
                paddingTop: "1rem",
              }}
            >
              วันที่
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
