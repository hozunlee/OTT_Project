import React, { useEffect, useState } from "react";
import axios from "axios";
import GridCards from "./GridCards";
import { Col, Row } from "antd";
//영화,음악 장르를 보내주고 그 기반으로 된 영화를 가져오는 페이지

const FilterMovie = ({ onPrev, onNext }) => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        async function loadData() {
            try {
                const response = await axios.get(
                    `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
                );
                setMovies(response.data.data.movies);
                console.log("get api");
                setLoading(false);
            } catch (e) {
                console.log("axios get Error");
            }
        }
        loadData();
    }, []);

    console.log(movies);

    return (
        <div>
            {loading ? (
                <h1>loading</h1>
            ) : (
                <div>
                    <h1>사용자 영화선택 페이지</h1>
                    <div>
                        <Row gutter={[16, 16]}>
                            {/*gutter는 Col간의 위 아래여백을 줄때 사용 */}
                            {movies &&
                                movies.map((movie, index) => (
                                    <React.Fragment key={index}>
                                        <GridCards
                                            image={movie.medium_cover_image}
                                            movieName={movie.title}
                                        />
                                    </React.Fragment>
                                ))}
                        </Row>
                    </div>
                    <button onClick={onPrev}>뒤로가기 버튼</button>
                    <button onClick={onNext}>좋아하는 영화 선택으로</button>
                </div>
            )}
        </div>
    );
};

export default FilterMovie;
