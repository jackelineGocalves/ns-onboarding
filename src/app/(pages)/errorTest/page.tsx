// function simulateNetworkError(delay = 6000) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             reject(new Error('Network error ocurred'));
//         }, delay)
//     });
// }

export default function ErrorTest() {
    // const error = simulateNetworkError()
    return ( 
        <h1>Error Test {/*{error} */}</h1>
    )
}