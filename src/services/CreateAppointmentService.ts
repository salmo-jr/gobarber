import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * [x] Recebimento das informações
 * [/]Tratativa de erros/exceções
 * [x]Acesso ao repositório
 */

interface RequestDTO {
    provider: string;
    date: Date;
}

/**
 * Dependency Inversion
 */

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ date, provider }: RequestDTO): Appointment {
        const appointmentDate = startOfHour(date);
        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });
        return appointment;
    }
}

export default CreateAppointmentService;
