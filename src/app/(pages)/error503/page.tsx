// import ErrorPage from "@/app/components/ErrorPage";
// import Error503 from "@/app/components/illustrations/Error503";
import ErrorPage from "@/components/ErrorPage";
import Error503 from "@/components/illustrations/Error503";

export default function Custom503() {
    return  (
        <ErrorPage 
            bgClass="error-page-503"
            img={<Error503 />}
            principalText="We’re in maintenance"
            tag="Please try again later."
        />
    )
}