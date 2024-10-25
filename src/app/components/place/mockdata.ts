import { IPlace } from '../../interfaces/place';

export const dataPlace: IPlace = {
  "id": 1,
  "name": "Main Auditorium",
  "description": "A large auditorium suitable for conferences and big events.",
  "images": [
      "auditorium1.jpg",
      "auditorium2.jpg"
  ],
  "capacity": 300,
  "available_from": "2024-10-14",
  "available_to": "2025-04-14",
  "type": "auditorio",
  "active": 1,
  "default_hours": "08:00-18:00",
  "default_days": [
      "Lun",
      "Mar",
      "Mie",
      "Jue",
      "Vie"
  ],
}

export const allDataPlaces: IPlace[] = [
    {
        "id": 1,
        "name": "Main Auditorium",
        "description": "A large auditorium suitable for conferences and big events.",
        "images": [
            "auditorium1.jpg",
            "auditorium2.jpg"
        ],
        "capacity": 300,
        "available_from": "2024-10-14",
        "available_to": "2025-04-14",
        "type": "auditorio",
        "active": 1,
        "default_hours": "08:00-18:00",
        "default_days": [
            "Lun",
            "Mar",
            "Mie",
            "Jue",
            "Vie"
        ],
    },
    {
        "id": 2,
        "name": "Conference Room A",
        "description": "A medium-sized conference room for meetings and workshops.",
        "images": [
            "conference1.jpg",
            "conference2.jpg"
        ],
        "capacity": 50,
        "available_from": "2024-10-14",
        "available_to": "2025-01-14",
        "type": "sala de conferencia",
        "active": 1,
        "default_hours": "09:00-17:00",
        "default_days": [
            "Lun",
            "Mie",
            "Vie"
        ],
    },
    {
        "id": 3,
        "name": "Meeting Room B",
        "description": "A small meeting room for private discussions and small groups.",
        "images": [
            "meeting1.jpg"
        ],
        "capacity": 10,
        "available_from": "2024-10-14",
        "available_to": "2024-12-14",
        "type": "sala de reunion",
        "active": 1,
        "default_hours": "10:00-16:00",
        "default_days": [
            "Mar",
            "Jue"
        ],
    }
];
