FROM jjrom/rocket:10.0.0

ENV ROCKET_APP_TITLE="Marine Plastic Tracker" \
    ROCKET_APP_DESCRIPTION="This application provide a What If Scenario for the Marine Plastic Tracker" \
    ROCKET_APP_AUTHOR="Mercator Ocean International" \
    ROCKET_APP_ICON="assets/img/marine-plastic-tracker-icon.jpg"

COPY envs/plastic-prod.js /app/env.js
COPY envs/marine-plastic-tracker-icon.jpg /app/assets/img/marine-plastic-tracker-icon.jpg
COPY src /app/app/addons/plastic
