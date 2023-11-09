export async function getItems({ restBase = "pages" }): Promise<
  {
    id: number;
    slug: string;
    link: string;
    path: string;
    [x: string]: any;
  }[]
> {
  let allData = [];
  let page = 1;
  let morePagesAvailable = true;

  while (morePagesAvailable) {
    const params = {
      per_page: 100,
      page: page,
    };

    const queryString = new URLSearchParams(params).toString();

    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/${restBase}?${queryString}`
      );

      const data = await req.json();

      if (data.length === 0 || data.code === "rest_post_invalid_page_number") {
        morePagesAvailable = false;
      } else {
        const modifiedData = data.map((item) => {
          return {
            ...item,
            path: item.link.replace(process.env.NEXT_PUBLIC_WP_URL, ""),
          };
        });

        allData = allData.concat(modifiedData);
        page++;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      morePagesAvailable = false;
    }
  }

  return allData;
}
