import Error404 from "@/components/illustrations/Error404";
import ErrorPage from "@/components/ErrorPage";

export default function NotFound() {
  return (
    <>
      <ErrorPage
        bgClass="error-page-404"
        img={<Error404 />}
        principalText="We can’t seem to find the page you’re looking for."
        tag="Maybe you’ll find the information you need on our website"
        showBtn={true}
      />
    </>
  );
}
