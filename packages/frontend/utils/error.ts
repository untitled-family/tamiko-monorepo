import toast from 'react-hot-toast';

const customErrors: { [name: string]: string } = {
  HasStartedHatching: 'Tamiko is already hatching',
  NotTamikoOwner: 'You do not own this Tamiko'
}

export const extractErrorMessage = (error: any) => {
  const message = error.reason || error.message;
  const customError = Object.keys(customErrors).find((key) => message.includes(key));

  if (customError) {
    return customErrors[customError]
  }

  return message
}

export const toastError = (error: any) => {
  toast.error(extractErrorMessage(error))
}