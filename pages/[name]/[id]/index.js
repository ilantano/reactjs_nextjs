// import { useRouter } from 'next/router'
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

const getDataMoviesById = async (id = 0) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=0aecc06bb4fadb06b5f071fef0c2ce6d&language=vi&append_to_response=videos,images&include_image_language=vi,null`;
  const response = await axios.get(url);
  const result = await response.status === 200 ? response.data : {};
  return result;
}

export async function getServerSideProps({ query }) {
  const id = await query.id;
  const result = await getDataMoviesById(id)
  return {
    props: {
      movie: result,
    },
  }
}