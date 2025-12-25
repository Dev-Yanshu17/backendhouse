const Appointment = require("../models/Appointment");

exports.createAppointment = async (req, res) => {
  try {
    const {
      customerName,
      appointmentDate,
      appointmentTime,
      phone,
      location,
      subject,
    } = req.body;

    // 1️⃣ Required fields check
    if (
      !customerName ||
      !appointmentDate ||
      !appointmentTime ||
      !phone ||
      !location ||
      !subject
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Phone validation
    const phoneRegex = /^[7-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res
        .status(400)
        .json({ message: "Invalid phone number" });
    }

    // 3️⃣ Date validation (no past date)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(appointmentDate);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res
        .status(400)
        .json({ message: "Past dates are not allowed" });
    }

    // 4️⃣ Prevent double booking (IMPORTANT)
    const existingSlot = await Appointment.findOne({
      appointmentDate: selectedDate,
      appointmentTime,
    });

    if (existingSlot) {
      return res
        .status(400)
        .json({ message: "This time slot is already booked" });
    }

    // 5️⃣ Save appointment
    const appointment = new Appointment({
      customerName,
      appointmentDate: selectedDate,
      appointmentTime,
      phone,
      location,
      subject,
    });

    await appointment.save();

    res.status(201).json({
      success: true,
      message: `Appointment booked successfully for ${appointmentTime}`,
    });
  } catch (error) {
    console.error("Appointment Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
