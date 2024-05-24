<template>
  <!-- <div>
    <button @click="toggleDatePickerVisibility">
      {{ appliedDateRange }}
      <span v-if="appliedHasBookedDaysInRange"> ({{ appliedBookedDaysCount }} booked days)</span>
    </button>
    <br><br> -->
    <div>
    <button @click="toggleDatePickerVisibility" style=" display: flex; align-items: center; border-radius: 6px;
border: 1px solid var(--Grey-200, #E6E7E8); padding: 8px;
background: var(--Grey-White, #FFF);
box-shadow: 0px 1px 2px 0px rgba(26, 40, 53, 0.09);color: var(--Grey-800, #34404B);

font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: 20px; /* 142.857% */
letter-spacing: -0.05px; cursor: pointer;">
<svg style="margin-right: 10px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M7.25 17.5534V17.4688M12.3125 17.5534V17.4688M12.3125 12.9688V12.8842M16.8125 12.9688V12.8842M3.875 8.46875H19.625M5.91071 2V3.68771M17.375 2V3.6875M17.375 3.6875H6.125C4.26104 3.6875 2.75 5.19854 2.75 7.0625V18.3126C2.75 20.1766 4.26104 21.6876 6.125 21.6876H17.375C19.239 21.6876 20.75 20.1766 20.75 18.3126L20.75 7.0625C20.75 5.19854 19.239 3.6875 17.375 3.6875Z" stroke="#4D5861" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
      {{ appliedDateRange }}
      <span class="calendar_toggle_btn" v-if="appliedHasBookedDaysInRange"> &lt;/&gt; {{ appliedBookedDaysCount }}</span>
    </button>
    <br><br>
    <div class="new_calendar_date_range_picker" v-show="showDatePicker">
      <div class="new_calendar_header">
        <div class="new_calendar_input_wrapper">
          <input type="text" v-model="dateRange" @focus="toggleDatePicker" @input="handleDateInput" class="new_calendar_date_input" />
          <button id="new_calendar_code_counter">&lt;/&gt; <span style="padding-left: 2px;"> {{ bookedDaysCount }}</span> </button>
        </div>
        <div id="new_calendar_arrows_wrapper">
          <button @click="clearDates">×</button>
          <div style="display: flex; align-items: center; margin-left: auto;">
            <button class="new_calendar_date_picker_arrows">
              <svg @click="prevMonth" class="new_calendar_arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="#34404B" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round" />
              </svg>
              <svg @click="nextMonth" class="new_calendar_arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="#34404B" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round" />
              </svg>
            </button>
            <button @click="selectToday" id="new_calendar_select_today">Today</button>
          </div>
        </div>
      </div>
      
      <div class="new_calendar_datepicker_container">
        <div class="new_calendar_wrapper">
          <div class="new_calendar" ref="startCalendar">
            <div class="new_calendar_month" style="text-align: center;">
              <span>{{ startMonth }} {{ startYear }}</span>
            </div>
            <div class="new_calendar_days_of_week">
              <div v-for="(dayName, index) in dayNames" :key="index" class="new_calendar_day_of_week">{{ dayName }}</div>
            </div>
            <div class="new_calendar_days">
              <div
                class="new_calendar_day"
                v-for="(day, index) in daysInMonth(startYear, startMonthIndex)"
                :key="index"
                :class="{
                  selected: isSelected(day, startMonthIndex),
                  highlighted: isHighlighted(day, startMonthIndex),
                  'start-date': isStartDate(day, startMonthIndex),
                  'end-date': isEndDate(day, startMonthIndex),
                  booked: isBooked(day, startMonthIndex)
                }"
                @click="selectDate(day, startMonthIndex)"
                @mouseover="showTooltip(index)"
                @mouseleave="hideTooltip(index)"
              >
                {{ day }}
                <div v-if="isBooked(day, startMonthIndex)" class="new_calendar_tooltip" v-show="tooltipVisible[index]">
                  <h6 class="new_calendar_tooltip_header">Major Code Changes</h6>
                 <li class="new_calendar_tooltip_list">Hero Image</li>
                 <li class="new_calendar_tooltip_list">Product Tiles (3)</li>
                 <li class="new_calendar_tooltip_list">Footer Links</li>
                </div>
              </div>
            </div>
          </div>
          <div class="new_calendar" ref="endCalendar">
            <div class="new_calendar_month">
              <span>{{ endMonth }} {{ endYear }}</span>
            </div>
            <div class="new_calendar_days_of_week">
              <div v-for="(dayName, index) in dayNames" :key="index" class="new_calendar_day_of_week">{{ dayName }}</div>
            </div>
            <div class="new_calendar_days">
             <div
                class="new_calendar_day"
                v-for="(day, index) in daysInMonth(startYear, startMonthIndex)"
                :key="index"
                :class="{
                  selected: isSelected(day, endMonthIndex),
                  highlighted: isHighlighted(day, endMonthIndex),
                  'start-date': isStartDate(day, endMonthIndex),
                  'end-date': isEndDate(day, endMonthIndex),
                  booked: isBooked(day, endMonthIndex)
                }"
                @click="selectDate(day, endMonthIndex)"
                @mouseover="showTooltip(index)"
                @mouseleave="hideTooltip(index)"
              >
                {{ day }}
                <div v-if="isBooked(day, endMonthIndex)" class="new_calendar_tooltip" v-show="tooltipVisible[index]">
                  <h6 class="new_calendar_tooltip_header">Major Code Changes</h6>
                 <li class="new_calendar_tooltip_list">Hero Image</li>
                 <li class="new_calendar_tooltip_list">Product Tiles (3)</li>
                 <li class="new_calendar_tooltip_list">Footer Links</li>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="new_calendar_total_code_change_text">25 Total Code Changes (to date) <span>&#63;</span>
        </p>
      </div>
      <div class="new_calendar_apply_button_wrapper">
        <button @click="applyDateRange" class="new_calendar_apply_button">Apply</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    const showDatePicker = ref(false);
    const startDate = ref(null);
    const endDate = ref(null);
    const dateRange = ref('');
    const appliedDateRange = ref(''); // New state variable to hold the applied date range
    const today = new Date();

    const startMonthIndex = ref(today.getMonth());
    const startYear = ref(today.getFullYear());
    const endMonthIndex = ref(today.getMonth() + 1);
    const endYear = ref(today.getFullYear());
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const startMonth = computed(() => monthNames[startMonthIndex.value]);
    const endMonth = computed(() => monthNames[endMonthIndex.value % 12]);

    const bookedDates = ref([
      new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    ]);

    const tooltipVisible = ref([]);

    onMounted(() => {
      if (endMonthIndex.value > 11) {
        endMonthIndex.value -= 12;
        endYear.value += 1;
      }
      // Set default date range of 7 days
      const start = new Date(today);
      const end = new Date(today);
      end.setDate(end.getDate() + 7);
      startDate.value = start;
      endDate.value = end;
      dateRange.value = `${formatDate(start)} - ${formatDate(end)}`;
      appliedDateRange.value = dateRange.value; // Initialize appliedDateRange
      updateBookedDaysCount();
    });

    const toggleDatePickerVisibility = () => {
      showDatePicker.value = !showDatePicker.value;
    };

    const daysInMonth = (year, monthIndex) => {
      return new Array(new Date(year, monthIndex + 1, 0).getDate()).fill(null).map((_, index) => index + 1);
    };

    const toggleDatePicker = () => {
      showDatePicker.value = showDatePicker.value;
    };

    const clearDates = () => {
      startDate.value = null;
      endDate.value = null;
      dateRange.value = '--/--/---- - --/--/----';
      bookedDaysCount.value = 0;
      showDatePicker.value = true;
    };

    const isSelected = (day, monthIndex) => {
      const selectedDate = new Date(startYear.value, monthIndex, day);
      return (startDate.value && selectedDate.getTime() === startDate.value.getTime()) || (endDate.value && selectedDate.getTime() === endDate.value.getTime());
    };

    const isHighlighted = (day, monthIndex) => {
      const selectedDate = new Date(startYear.value, monthIndex, day);
      return startDate.value && endDate.value && selectedDate > startDate.value && selectedDate < endDate.value;
    };

    const isStartDate = (day, monthIndex) => {
      const selectedDate = new Date(startYear.value, monthIndex, day);
      return startDate.value && selectedDate.getTime() === startDate.value.getTime();
    };

    const isEndDate = (day, monthIndex) => {
      const selectedDate = new Date(startYear.value, monthIndex, day);
      return endDate.value && selectedDate.getTime() === endDate.value.getTime();
    };

    const isBooked = (day, monthIndex) => {
      const selectedDate = new Date(startYear.value, monthIndex, day);
      return bookedDates.value.some(date => date.getTime() === selectedDate.getTime());
    };

    const showTooltip = (index) => {
      tooltipVisible.value[index] = true;
    };

    const hideTooltip = (index) => {
      tooltipVisible.value[index] = false;
    };

    const selectDate = (day, monthIndex) => {
      const selectedDate = new Date(startYear.value, monthIndex, day);
      if (!startDate.value || (startDate.value && endDate.value)) {
        startDate.value = selectedDate;
        endDate.value = null;
      } else if (startDate.value && !endDate.value) {
        if (selectedDate < startDate.value) {
          endDate.value = startDate.value;
          startDate.value = selectedDate;
        } else {
          endDate.value = selectedDate;
        }
      }
      dateRange.value = `${formatDate(startDate.value)} - ${formatDate(endDate.value || startDate.value)}`;
      updateBookedDaysCount(); // Update immediately for immediate count display
    };

    const selectToday = () => {
      const today = new Date();
      startDate.value = today;
      endDate.value = today;
      dateRange.value = `${formatDate(today)} - ${formatDate(today)}`;
      updateBookedDaysCount(); // Update immediately for immediate count display
    };

    const prevMonth = () => {
      startMonthIndex.value -= 1;
      if (startMonthIndex.value < 0) {
        startMonthIndex.value = 11;
        startYear.value -= 1;
      }
      endMonthIndex.value = startMonthIndex.value + 1;
      if (endMonthIndex.value > 11) {
        endMonthIndex.value -= 12;
        endYear.value += 1;
      }
    };

    const nextMonth = () => {
      startMonthIndex.value += 1;
      if (startMonthIndex.value > 11) {
        startMonthIndex.value = 0;
        startYear.value += 1;
      }
      endMonthIndex.value = startMonthIndex.value + 1;
      if (endMonthIndex.value > 11) {
        endMonthIndex.value -= 12;
        endYear.value += 1;
      }
    };

    const applyDateRange = () => {
      showDatePicker.value = false;
      appliedDateRange.value = dateRange.value; // Update appliedDateRange when user clicks apply
      updateAppliedBookedDaysCount();
    };

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    };

    const bookedDaysCount = ref(0);
    const appliedBookedDaysCount = ref(0); // New state variable to hold the applied booked days count

    const updateBookedDaysCount = () => {
      if (!startDate.value || !endDate.value) {
        bookedDaysCount.value = 0;
        return;
      }
      const count = bookedDates.value.filter(date => date >= startDate.value && date <= endDate.value).length;
      bookedDaysCount.value = count;
    };

    const updateAppliedBookedDaysCount = () => {
      if (!startDate.value || !endDate.value) {
        appliedBookedDaysCount.value = 0;
        return;
      }
      const count = bookedDates.value.filter(date => date >= startDate.value && date <= endDate.value).length;
      appliedBookedDaysCount.value = count;
    };

    const hasBookedDaysInRange = computed(() => bookedDaysCount.value > 0);
    const appliedHasBookedDaysInRange = computed(() => appliedBookedDaysCount.value > 0); // New computed property for applied booked days

    return {
      showDatePicker,
      startDate,
      endDate,
      dateRange,
      appliedDateRange,
      today,
      startMonthIndex,
      startYear,
      endMonthIndex,
      endYear,
      dayNames,
      monthNames,
      startMonth,
      endMonth,
      bookedDates,
      tooltipVisible,
      toggleDatePickerVisibility,
      daysInMonth,
      toggleDatePicker,
      clearDates,
      isSelected,
      isHighlighted,
      isStartDate,
      isEndDate,
      isBooked,
      showTooltip,
      hideTooltip,
      selectDate,
      selectToday,
      prevMonth,
      nextMonth,
      applyDateRange,
      formatDate,
      bookedDaysCount,
      appliedBookedDaysCount,
      updateBookedDaysCount,
      updateAppliedBookedDaysCount,
      hasBookedDaysInRange,
      appliedHasBookedDaysInRange
    };
  }
};
</script>




<style>
.new_calendar_date_range_picker {
  flex-direction: column;
  align-items: center;
  width: 480px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
}

.calendar_toggle_btn{
display: unset !important;
border-radius: 4px;
  background: #449ff4;
  padding: 3px 7px;
  font-size: 12px;
  color: #fff;
  font-weight: 700;
  /* display: flex; */
  margin-left: 10px;
}

.new_calendar_date_picker_arrows {
  display: flex;
  align-items: center;
}

.new_calendar_arrow {
  margin-bottom: 0px;
  margin-left: 4px;
  border-radius: 4px;
  border: 1px solid var(--Grey-200, #E6E7E8);
  background: var(--Grey-White, #FFF);
  box-shadow: 0px 1px 2px 0px rgba(26, 40, 53, 0.09);
  padding: 4px 8px;
}

.new_calendar_input_wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.new_calendar_header {
  display: flex;
  align-items: center;
  width: 100%;
}

.new_calendar_date_input {
  padding: 6px;
  border: none;
  font-size: 12px;
  font-weight: 500;
}

.new_calendar_date_input:focus {
  outline: none;
}

.new_calendar_header button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 5px;
  font-size: 1.5em;
}

.new_calendar_datepicker_container {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.new_calendar_wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.new_calendar {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

#new_calendar_code_counter {
  border-radius: 4px;
  background: #449ff4;
  padding: 5px 7px;
  font-size: 12px;
  color: #fff;
  font-weight: 700;
  display: flex;
}

#new_calendar_arrows_wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
}

#new_calendar_select_today {
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  border: 1px solid var(--Grey-200, #E6E7E8);
  background: var(--Grey-White, #FFF);
  /* Shadows/XS */
  box-shadow: 0px 1px 2px 0px rgba(26, 40, 53, 0.09);
  padding: 8px;
}

.new_calendar_month {
  text-align: center;
  margin-bottom: 10px;
}

.new_calendar_days_of_week {
  margin-bottom: 10px;
}

.new_calendar_days,
.new_calendar_days_of_week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}

.new_calendar_day {
  text-align: center;
  padding: 5px;
  cursor: pointer;
  position: relative;
}

.new_calendar_day:hover {
  background: #03c191;
  transition: 0.1s ease-in-out;
  border-radius: 4px;
}

.new_calendar_day.selected {
  background: #03c191;
  color: #fff;
}

.new_calendar_day.highlighted {
  background-color: #d7ffed;
}

.new_calendar_day.start-date {
  border-radius: 12px 0px 0px 12px;
  background: #03c191;
}

.new_calendar_day.end-date {
  /* background-color: red; */
  border-radius: 0px 12px 12px 0px;
  background: #03c191;
}

.new_calendar_day.booked {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
  background: var(--Info-03-Main, #449FF4);
  color: #FFF;
  position: relative;
}

.new_calendar_day.booked:hover {
  border-radius: 0px;
}

.new_calendar_tooltip {
  width: 200px;
  position: absolute;
  top: 100%;
  left: 350%; 
  transform: translateX(-50%);
  background: #fff;
  color: #000;
  padding: 10px;
  /* border: 1px solid #ddd; */
  z-index: 999;
  display: none;
  text-align: start;

  border-radius: 10px;
border: 1px solid var(--Grey-200, #E6E7E8);
background: var(--Grey-White, #FFF);
box-shadow: 0px 1px 2px 0px rgba(26, 40, 53, 0.09);
}

.new_calendar_day.booked:hover .new_calendar_tooltip {
  display: block;
}

.new_calendar_tooltip_header{
  color: var(--Grey-800, #34404B);
font-size: 12px;
font-style: normal;
font-weight: 600;
padding: 0px;
margin: 0px;
}

.new_calendar_tooltip_list{
  list-style-type: none;
  margin: 10px 0px 10px 0px;
  color: var(--Grey-800, #34404B);
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 12px; /* 100% */
}

.new_calendar_total_code_change_text{
  width: 100%; text-align: end; color: #225CAF; font-size: 12px; font-style: normal; font-weight: 600; line-height: 12px; margin-top: 20px;
}

.new_calendar_apply_button_wrapper{
  display: flex; justify-content: end; border-top: 2px solid #E6E7E8;
  /* margin-top: 5px; */
  padding-top: 10px;
}

.new_calendar_apply_button{
  border: none; border-radius: var(--Padding-Corner, 6px); font-size: 15px; color: #fff;
  font-style: normal;
  font-weight: 600;
  background: var(--Primary-03-Main, #00936F);
  display: flex;
  padding: var(--Padding-Horizontal-padding, 10px) var(--Padding-Vertical-padding, 16px);
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
}

</style>