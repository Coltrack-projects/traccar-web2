import React from "react";
import { OverlayView } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import { devicesActions } from "../store";

const GoogleMapsPositions = ({ filteredPositions }) => {
    const dispatch = useDispatch();
    const devices = useSelector((state) => state.devices.items);
    const selectedDeviceId = useSelector((state) => state.devices.selectedId);
    const selectedPosition = useSelector(
        (state) => state.session.positions[selectedDeviceId]
    );

    const handleMarkerClick = (marker) => {
        dispatch(devicesActions.selectId(marker.deviceId));
    };

    return (
        <>
            {filteredPositions?.length &&
                filteredPositions?.map((marker, index) => (
                    <OverlayView
                        key={index + 789878}
                        position={{
                            lat: marker.latitude,
                            lng: marker.longitude,
                        }}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                        <>
                            <div
                                onClick={() => handleMarkerClick(marker)}
                                style={{
                                    position: "absolute",
                                    left: marker.longitude * 0.08 - 23,
                                    top: marker.latitude * 0.024 - 35,
                                    color: "white",
                                    padding: "5px",
                                    textAlign: "center",
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    height="36"
                                    width="36"
                                    style={{
                                        borderRadius: "50%",
                                        // transform: `rotate(${marker.course}deg)`,
                                    }}
                                    alt="defalut-icon"
                                    src={`./truck-${devices[marker.deviceId]?.status}.png`}
                                ></img>
                            </div>
                            <div
                                style={{
                                    position: "absolute",
                                    left: marker.longitude * 0.08 - 53,
                                    top: marker.latitude * 0.024 + 5,
                                    backgroundColor: "black",
                                    color: "white",
                                    minWidth: "100px",
                                    padding: "5px",
                                    borderRadius: "5px",
                                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
                                    textAlign: "center",
                                }}
                            >
                                {devices[marker.deviceId]?.name}
                            </div>
                        </>
                    </OverlayView>
                ))}
        </>
    );
};

export default GoogleMapsPositions;
