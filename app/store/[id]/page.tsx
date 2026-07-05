"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Loading from "@/app/components/LoadingHome/Loading";
import HomeSection from "@/app/components/HomeSection/HomeSection";
import { useCart } from "@/app/Context/CartContext";
import styles from "./StorePage.module.css";

const StoreHeader = dynamic(
  () => import("@/app/components/StoresList/StoreInfo"),
  { ssr: false }
);
const ProductsList = dynamic(
  () => import("@/app/components/Product/ProductList"),
  { ssr: false }
);

export default function StorePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { items, totals} = useCart();

  const [store, setStore] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  const [addresses, setAddresses] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null);
  const [checkoutError, setCheckoutError] = useState("");
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [orderResult, setOrderResult] = useState<any>(null);

  useEffect(() => {
    async function fetchStore() {
      if (!id) return;

      try {
        setLoading(true);
        setError("");

        const res = await fetch(`https://api1.renn.ir/store/${id}`, {
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error();
        }

        const json = await res.json();
        const data = json.data || json;

        setStore(data.store);
        setSections(data.sections || []);
      } catch (err) {
        setError("خطا در دریافت اطلاعات فروشگاه");
      } finally {
        setLoading(false);
      }
    }

    fetchStore();
  }, [id]);

  useEffect(() => {
    if (step !== 4 && items.length === 0) {
      setStep(1);
    }
  }, [items.length, step]);

  const handleGoToStepTwo = () => {
    if (totals.items_count === 0) return;
    setCheckoutError("");
    setStep(2);
  };

  const handleGoToStepThree = async () => {
    try {
      setCheckoutError("");

      const [addrRes, payRes] = await Promise.all([
        fetch("https://api1.renn.ir/addresses", {
          credentials: "include",
          cache: "no-store",
        }),
        fetch("https://api1.renn.ir/payment_methods", {
          credentials: "include",
          cache: "no-store",
        }),
      ]);

      if (!addrRes.ok || !payRes.ok) {
        throw new Error();
      }

      const addrJson = await addrRes.json();
      const payJson = await payRes.json();

      const addrList = addrJson.data?.items || addrJson.items || [];
      const payList = payJson.data?.items || payJson.items || [];

      setAddresses(addrList);
      setPaymentMethods(payList);

      setSelectedAddressId(addrList.length > 0 ? addrList[0].id : null);
      setSelectedPaymentId(payList.length > 0 ? payList[0].id : null);

      setStep(3);
    } catch {
      setCheckoutError("خطا در بارگذاری اطلاعات آدرس و پرداخت");
    }
  };

  const handleSubmitOrder = async () => {
    if (!selectedAddressId || !selectedPaymentId) {
      setCheckoutError("لطفاً آدرس و روش پرداخت را انتخاب کنید");
      return;
    }

    try {
      setSubmittingOrder(true);
      setCheckoutError("");

      const res = await fetch("https://api1.renn.ir/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          address_id: selectedAddressId,
          payment_method_id: selectedPaymentId,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "ثبت سفارش ناموفق بود");
      }

      setOrderResult(json.data || json);
      setStep(4);

    } catch (err: any) {
      setCheckoutError(err.message || "خطا در ثبت سفارش");
    } finally {
      setSubmittingOrder(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <main className={styles.page}>
      {store && (
        <HomeSection height={120}>
          <StoreHeader data={store} />
        </HomeSection>
      )}

      {error && (
        <div className={styles.pageError}>
          <p>{error}</p>
        </div>
      )}

      {sections.map((section, idx) =>
        section.type === "product_list" ? (
          <HomeSection key={idx} height={10}>
            <ProductsList
              title={section.data.title}
              items={section.data.items || []}
            />
          </HomeSection>
        ) : null
      )}
      {(items.length > 0 || step === 4) && (
      <div className={styles.cartFooter}>
        {checkoutError && <p className={styles.errorText}>{checkoutError}</p>}

        {items.length > 0 && step === 1 && (
          <div className={styles.cartStepOne}>
            <button className={styles.orangeBtn} onClick={handleGoToStepTwo}>
              تکمیل سفارش
            </button>

            <div className={styles.cartInfo}>
              <span className={styles.totalPrice}>
                {totals.final_price.toLocaleString("fa-IR")} تومان
              </span>
              <span className={styles.divider}>|</span>
              <span className={styles.itemCount}>
                {totals.items_count.toLocaleString("fa-IR")} محصول
              </span>
            </div>

            <div className={styles.imageStack}>
              {items.slice(0, 3).map((item, idx) => (
                <div
                  key={`${item.product_id}-${idx}`}
                  className={styles.miniImgWrapper}
                  style={{ zIndex: 10 - idx }}
                >
                  <img src={item.image || "/placeholder.png"} alt={item.title} />
                </div>
              ))}
            </div>
          </div>
        )}

        {items.length > 0 && step === 2 && (
          <div className={styles.cartStepTwo}>
            <div className={styles.invoiceList}>
              {items.map((item) => (
                <div key={item.product_id} className={styles.invoiceRow}>
                  <div className={styles.itemRightSide}>
                    <span className={styles.itemQty}>
                      {item.quantity?.toLocaleString("fa-IR")}
                    </span>
                    <span className={styles.itemTitle}>{item.title}</span>
                  </div>
                  <div className={styles.dottedLine}></div>
                  <div className={styles.itemPrice}>
                    {(
                      (item.final_price || item.price || 0) *
                      (item.quantity || 0)
                    ).toLocaleString("fa-IR")}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.invoiceDivider}></div>

            <div className={styles.summarySection}>
              <div className={styles.summaryRow}>
                <span>مجموع</span>
                <div className={styles.dottedLine}></div>
                <span>{totals.total_price.toLocaleString("fa-IR")} تومان</span>
              </div>

              <div
                className={styles.summaryRow}
                style={{ color: "#ef4444" }}
              >
                <span>تخفیف</span>
                <div className={styles.dottedLine}></div>
                <span>
                  {totals.total_discount.toLocaleString("fa-IR")} تومان-
                </span>
              </div>

              <div
                className={styles.summaryRow}
                style={{
                  fontWeight: "800",
                  color: "#000",
                  marginTop: "8px",
                }}
              >
                <span>قابل پرداخت</span>
                <div className={styles.dottedLine}></div>
                <span>{totals.final_price.toLocaleString("fa-IR")} تومان</span>
              </div>
            </div>

            <button className={styles.orangeFullBtn} onClick={handleGoToStepThree}>
              ادامه
            </button>
          </div>
        )}

        {items.length > 0 && step === 3 && (
          <div className={styles.cartStepThree}>
            <div className={styles.selectionBlock}>
              <label className={styles.fieldLabel}>نحوه پرداخت</label>
              <div className={styles.selectWrapper}>
                <select
                  value={selectedPaymentId || ""}
                  onChange={(e) => setSelectedPaymentId(Number(e.target.value))}
                  className={styles.customSelect}
                >
                  {paymentMethods.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title}
                    </option>
                  ))}
                </select>
                <span className={styles.chevronIcon}>⌄</span>
              </div>
            </div>

            <div className={styles.selectionBlock}>
              <label className={styles.fieldLabel}>آدرس</label>
              <div className={styles.selectWrapper}>
                <select
                  value={selectedAddressId || ""}
                  onChange={(e) => setSelectedAddressId(Number(e.target.value))}
                  className={styles.customSelect}
                >
                  {addresses.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.title} - {a.address}
                    </option>
                  ))}
                </select>
                <span className={styles.chevronIcon}>⌄</span>
              </div>
            </div>

            <button
              className={styles.orangeFullBtn}
              onClick={handleSubmitOrder}
              disabled={submittingOrder}
            >
              {submittingOrder ? "در حال ثبت..." : "ثبت نهایی سفارش"}
            </button>
          </div>
        )}

        {step === 4 && (
          <div className={styles.successStep}>
            <div className={styles.successCircle}>✓</div>
            <h3 className={styles.successTitle}>سفارش ثبت شد</h3>

            <div className={styles.messageBox}>
              <p>
                {orderResult?.message || "سفارش شما با موفقیت در سیستم ثبت شد."}
              </p>
              {orderResult?.order_id && (
                <div className={styles.orderBadge}>
                  کد سفارش: {orderResult.order_id}
                </div>
              )}
            </div>

            <button
              className={styles.orangeFullBtn}
              onClick={() => router.push("/")}
            >
              اتمام
            </button>
          </div>
        )}
      </div>
      )}
    </main>
  );
}
