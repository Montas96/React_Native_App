/* eslint-disable prettier/prettier */
import { put, call } from 'redux-saga/effects';
import DeviceAction from '../actions/device.action';

export function* saveDevice(api, { device }) {

    const response = yield call(api.saveDevice, device);

    if (response.ok) {
        yield put({
            type: DeviceAction.saveDeviceSuccess,
            device: response.data,
        });
    } else {
        yield put({
            type: DeviceAction.saveDeviceFailure,
            error: 'Failed to save device',
        });
    }
}
