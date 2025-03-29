// import ErrorPage from "@/app/components/ErrorPage";
// import Error500 from "@/app/components/illustrations/Error500";
import ErrorPage from "@/components/ErrorPage";
import Error500 from "@/components/illustrations/Error500";

export default function Custom500() {
    return  (
        <ErrorPage 
            bgClass="error-page-500"
            img={<Error500 />}
            principalText="Something went wrong"
            tag="We couldn’t find what you were looking for"
        />
    )
}