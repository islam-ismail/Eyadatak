import React from "react";

export const DoctorDetailsPanel = props => {
    const { doctor, detailsActive } = props;
    let age = 0;
    if (doctor && doctor.name) {
        age = new Date().getFullYear() - new Date(doctor.birthdate).getFullYear();
    }
    return (
        <div className={`profile aside${detailsActive === "active" ? "-active" : ""}`}>
            {doctor && doctor.name ? (
                <>
                    <div className="section">
                        <div className="title">
                            <h3>تفاصيل الطبيب</h3>
                        </div>
                        <div className="info w-pic">
                            <img src={doctor.picture_url} alt={doctor.name} />
                            <p>{doctor.name}</p>
                        </div>
                        <div className="info">
                            <h4>الجنس</h4>
                            <p>{doctor.gender}</p>
                        </div>
                        <div className="info">
                            <h4>العمر</h4>
                            <p>{age}</p>
                        </div>
                    </div>
                    {doctor.education_degrees && doctor.education_degrees.length !== 0 ? (
                        <>
                            <div className="section">
                                <div className="title">
                                    <h3>الدرجات العلمية</h3>
                                </div>
                                {doctor.education_degrees.map(degree => (
                                    <div key={degree.id} className="info w-pic">
                                        <img src={degree.picture_url} alt={degree.university} />
                                        <p>
                                            {degree.degree} {degree.university}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                    {doctor.doctor_info ? (
                        <>
                            <div className="section">
                                <div className="title">
                                    <h3>عن الطبيب</h3>
                                </div>
                                <div className="info bio">
                                    <p>{doctor.doctor_info.about}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </>
            ) : (
                <>
                    <div className="section">
                        <div className="title">
                            <h3>لم يتم تعيين طبيب لهذا السؤال بعد</h3>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
