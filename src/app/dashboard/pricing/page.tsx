import { GetSubscription } from "@/app/actions/subscription.action";
import PricingTable from "@/components/layout/PricingTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import React from "react";

const PricingPage = async () => {
  const subscriptionData = await GetSubscription();

  async function createCustomerPortal() {
    "use server";

    const session = await stripe.billingPortal.sessions.create({
      customer: subscriptionData?.User?.customerId as string,
      return_url:
        process.env.NODE_ENV === "production"
          ? "https://blog-marshal.vercel.app/dashboard"
          : "http://localhost:3000/dashboard",
    });
    return redirect(session.url);
  }
  if (subscriptionData?.status === "active") {
    return (
      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Edit Subscription</CardTitle>
          <CardDescription>
            Click on the button below, this will give you the opportunity to
            change your payment details and view your statement at the same
            time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createCustomerPortal}>
            <SubmitButton text="View Subscription Details" />
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <PricingTable />
    </div>
  );
};

export default PricingPage;
