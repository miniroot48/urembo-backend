-- Add Paystack subaccount fields to Profile table
ALTER TABLE "Profile" ADD COLUMN "paystackSubaccountId" TEXT;
ALTER TABLE "Profile" ADD COLUMN "paystackSubaccountVerified" BOOLEAN DEFAULT false;

-- Add Paystack reference field to Order table
ALTER TABLE "Order" ADD COLUMN "paystackReference" TEXT;
