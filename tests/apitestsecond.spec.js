import { expect, test } from "@playwright/test";

test("Create POST api request using static request body in playwright", async ({
    request,
  }) => {
    // create post api request using playwright
    const postAPIResponse = await request.post("https://restful-booker.herokuapp.com/booking", {
      data: {
        firstname: "Raju",
        lastname: "G",
        totalprice: 1000,
        depositpaid: true,
        bookingdates: {
          checkin: "2025-01-01",
          checkout: "2025-01-01",
        },
        additionalneeds: "super bowls",
      },
    });
  
    // validate status code
    console.log(await postAPIResponse.json());
  
    expect(postAPIResponse.ok()).toBeTruthy();
    expect(postAPIResponse.status()).toBe(200);
  
    // validate api response json obj
    const postAPIResponseBody = await postAPIResponse.json();
  
    expect(postAPIResponseBody.booking).toHaveProperty(
      "firstname",
      "Raju"
    );
    expect(postAPIResponseBody.booking).toHaveProperty(
      "lastname",
      "G"
    );
  
    // validate api response nested json obj
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
      "checkin",
      "2025-01-01"
    );
    expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
      "checkout",
      "2025-01-01"
    );
  });
  
