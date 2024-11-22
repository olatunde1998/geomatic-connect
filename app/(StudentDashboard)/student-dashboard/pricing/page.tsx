import { auth } from "@/auth";
import Pricing from "@/app/components/student-components/Pricing";

export default async function PricingPage() {
  const session = await auth();
  const token = session?.user?.token;
  const userId = session?.user?._id;

  return (
    <main className="min-h-screen p-6 pt-32 lg:p-12 xl:p-20 lg:pt-32 xl:pt-32 font-sans text-md">
      <div className="w-full font-sans text-md ">
        <p className="text-2xl font-bold mb-2">Pricing</p>
        <p className="max-w-[550px] leading-8 font-light">
          All paid plans allow using assets with no time limit and link to us.
          Unused downloads are transferred to the next period. Each account is
          for one user only. If you&apos;re a team of 5+, contact us for
          white-glove service and pass to the VIP lounge for free
        </p>
      </div>
      <section className="h-fit border mt-8 p-6 rounded-md">
        <Pricing token={token} userId={userId} />
      </section>
    </main>
  );
}
