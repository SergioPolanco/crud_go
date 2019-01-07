import Alert from 'react-s-alert'

function flashAlert(alert) {
    if (alert) {
        if (alert.type == 'alert-danger') {
            Alert.error(
                alert.message,
                {
                    position: 'bottom-right',
                    timeout: 'none'
                }
            )
        }
    }
}

export {
    flashAlert
}