
import TourData from "../../data/ecuItinEng"

function TourPage({ aTour }){

    console.log(aTour)

    return(<>
        <div> {aTour.tripName} </div>
    </>)
}

export async function getStaticPaths(){
    const paths = TourData.map((elem)=>({
        params: { id: elem.id.toString() }
    }))
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }){
    // const sampleTour= { "general": "cucu" }
    const thetours = TourData.filter(elem=> elem.id.toString() ===params.id )

    return{
        props: {aTour: thetours[0] }
    }
}

export default TourPage