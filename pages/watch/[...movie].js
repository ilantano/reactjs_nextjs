import * as api from '../../redux/api/movies'
import axios from 'axios'
import {Row,Col,Image} from 'antd'

export default function DetailMovie({movie}) {
  // const router = useRouter()
  // const { id } = router.query
  return (
    <>
       <Row>
        <Col style={{padding:'10px'}} span={6}>
          <Image
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
          <p style={{textAlign:'center'}}>{movie.original_title}</p>
          <button>Trailer</button>
        </Col>
        <Col  span={12}>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
        </Col>
        <Col style={{padding:'10px'}} span={6}>
          <Row>
            {movie.images.backdrops.map((item, index) => (
               <Col key={index} span={24} style={{padding:'10px'}}>
                 <Image
                  src={`https://image.tmdb.org/t/p/w300${item.file_path}`}
                  alt={movie.vote_count}
                  />
               </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  )
}


export async function getServerSideProps({ query }) {
  //const id = await query.id;
  //const result = await getDataMoviesById(id)
  // console.log(query)
  const params =query.movie || []
  const id = params[1]
  const result = await api.getDataMoviesById(id)
  return {
    props: {
      movie: result
    },
  }
}