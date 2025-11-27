import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import NotFoundRobot from '@/assets/404_robot.svg'

const NotFoundPage = () => {
	const navigate = useNavigate()

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<img src={NotFoundRobot} className="w-64" />
			<Button size="sm" variant="outline" onClick={() => navigate('/')}>← Home</Button>
		</div>
	)
}

export default NotFoundPage