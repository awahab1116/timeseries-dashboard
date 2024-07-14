import { NextRequest, NextResponse } from "next/server";
import { analytics } from "./utils/analytics";

export default async function middleware(req: NextRequest) {
  //user is navigating to the home page
  if (req.nextUrl.pathname === "/") {
    //track analytics events
    analytics.track("page_view", {
      page: "/",
      country: req.geo?.country,
    });

    try {
    } catch (e) {
      console.error(e);
    }
  }

  return NextResponse.next();
}

export const matcher = {
  matcher: ["/"],
};
