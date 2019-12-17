import { notification } from 'antd';

const openNotification = data => {
	notification.open({
		message: data.message,
		description: data.description,
		duration: 3
	});
};

export default openNotification;
