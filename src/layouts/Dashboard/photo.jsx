import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Header from "../../components/dashboard/common/header";
import Sidemenu from "../../components/dashboard/common/sidemenu";
import "../../components/dashboard/css/dstyle.css";
import "../../components/dashboard/css/style-responsive.css";
import "../../components/dashboard/css/style.css";
import authService from '../../services/authService';
import constants from '../../services/constants';
import projectservice from '../../services/projectservice';
import LikedPhoto from './common/likedphoto';


function Photo(props) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const getInit = async () => {
        const result = await projectservice.getExploreProjects();
        setProjects(result);
        setLoading(false);
    };

    useEffect(() => {
        getInit();
    }, []);
    if (authService.getToken() === null) return <Redirect to="/" />;
    return (
        <section id="container">
            <Header />
            <Sidemenu />

            <section id="main-content">
                <section className="wrapper">
                    <section className="filters mt-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-5 col-md-12">
                                    <h2>Photos I Like</h2>
                                </div>
                                <div className="col-lg-7 col-md-12">
                                    <div className="city-filter explore-filter">
                                        <span>City</span>
                                        <span>Design fee</span>
                                        <span>Profesional</span>
                                        <span>Most Viewed</span>
                                        <span>Most Liked</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="project-details mt-5">
                        <div className="container">
                            <section className="project-details mt-5">
                                <div className="container">
                                    <div className="row">
                                    { loading ? <center><Spinner animation="border" /></center> : projects.map((p) => (

                                        <LikedPhoto project={p}  />
                                    ))}

                                    </div>

                                </div>
                            </section>
                        </div>
                    </section>
                </section>
            </section>
        </section>
    );
}

export default Photo;