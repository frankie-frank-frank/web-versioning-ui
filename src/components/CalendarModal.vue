<template>
  <div>
      <button @click="toggleDatePickerVisibility">{{ showDatePicker ? 'Close Calendar' : 'Open Calendar' }}</button> <br><br>
      <div class="new_calendar_date_range_picker" v-show="showDatePicker">
        <div class="new_calendar_header">
          <div class="new_calendar_input_wrapper">
          <input type="text" v-model="dateRange" @focus="toggleDatePicker" @input="handleDateInput" class="new_calendar_date_input"/>
          <button id="new_calendar_code_counter">&lt;/&gt; <span style="padding-left: 2px;"> 2</span> </button>
          </div>
          <div id="new_calendar_arrows_wrapper">

              <button @click="clearDates">×</button>

              <div style="display:flex; align-items: center; margin-left: auto;">
                    <button class="new_calendar_date_picker_arrows">
                        <svg @click="prevMonth" class="new_calendar_arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12.5 15L7.5 10L12.5 5" stroke="#34404B" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
                    </svg>
                    <svg @click="nextMonth" class="new_calendar_arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="#34404B" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"/>
                    </svg>
                </button>
                  <button @click="selectToday" id="new_calendar_select_today">Today</button>
              </div>
          </div>
        </div>
        <div>
          
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
                <div class="new_calendar_day" v-for="(day, index) in daysInMonth(startYear, startMonthIndex)" :key="index" :class="{ selected: isSelected(day, startMonthIndex), highlighted: isHighlighted(day, startMonthIndex) }" @click="selectDate(day, startMonthIndex)">
                  {{ day }}
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
                <div class="new_calendar_day" v-for="(day, index) in daysInMonth(endYear, endMonthIndex)" :key="index" :class="{ selected: isSelected(day, endMonthIndex), highlighted: isHighlighted(day, endMonthIndex) }" @click="selectDate(day, endMonthIndex)">
                  {{ day }}
                </div>
              </div>
            </div>
          </div>
          
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
  //   const showDatePicker = ref(true);
    const dateRange = ref('');
    const today = new Date();

    const startMonthIndex = ref(today.getMonth());
    const startYear = ref(today.getFullYear());
    const endMonthIndex = ref(today.getMonth() + 1);
    const endYear = ref(today.getFullYear()); 
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const startMonth = computed(() => monthNames[startMonthIndex.value]);
    const endMonth = computed(() => monthNames[endMonthIndex.value % 12]);

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
      // dateRange.value = '';
      dateRange.value = '--/--/---- - --/--/----';
      showDatePicker.value = true;
    };

    const isSelected = (day, monthIndex) => {
      const selectedDate = new Date(startYear.value, monthIndex, day);
      return (startDate.value && selectedDate.getTime() === startDate.value.getTime()) || (endDate.value && selectedDate.getTime() === endDate.value.getTime());
    };

    const isHighlighted = (day, monthIndex) => {
      if (!startDate.value || !endDate.value) return false;
      const currentDate = new Date(startYear.value, monthIndex, day);
      return currentDate >= startDate.value && currentDate <= endDate.value;
    };

    const selectDate = (day, monthIndex) => {
      const selectedDate = new Date(startYear.value, monthIndex, day);
      if (!startDate.value || (startDate.value && endDate.value)) {
        startDate.value = selectedDate;
        endDate.value = null;
      } else {
        endDate.value = selectedDate > startDate.value ? selectedDate : startDate.value;
        startDate.value = selectedDate > startDate.value ? startDate.value : selectedDate;
      }
      dateRange.value = `${formatDate(startDate.value)} - ${endDate.value ? formatDate(endDate.value) : ''}`;
    };

    const formatDate = (date) => {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    };

    const prevMonth = () => {
      if (startMonthIndex.value === 0) {
        startMonthIndex.value = 11;
        startYear.value -= 1;
      } else {
        startMonthIndex.value -= 1;
      }
      if (endMonthIndex.value === 0) {
        endMonthIndex.value = 11;
        endYear.value -= 1;
      } else {
        endMonthIndex.value -= 1;
      }
    };

    const nextMonth = () => {
      if (startMonthIndex.value === 11) {
        startMonthIndex.value = 0;
        startYear.value += 1;
      } else {
        startMonthIndex.value += 1;
      }
      if (endMonthIndex.value === 11) {
        endMonthIndex.value = 0;
        endYear.value += 1;
      } else {
        endMonthIndex.value += 1;
      }
    };

    const selectToday = () => {
      const today = new Date();
      const start = new Date(today);
      const end = new Date(today);
      end.setDate(end.getDate() + 7);
      startDate.value = start;
      endDate.value = end;
      dateRange.value = `${formatDate(start)} - ${formatDate(end)}`;
    };

    const handleDateInput = (event) => {
      const dates = event.target.value.split(' - ');
      if (dates.length === 2) {
        const start = new Date(dates[0]);
        const end = new Date(dates[1]);
        if (!isNaN(start) && !isNaN(end)) {
          startDate.value = start;
          endDate.value = end;
        }
      }
    };

    return {
      dayNames,
      startDate,
      endDate,
      showDatePicker,
      toggleDatePickerVisibility,
      dateRange,
      startMonthIndex,
      startYear,
      endMonthIndex,
      endYear,
      startMonth,
      endMonth,
      daysInMonth,
      toggleDatePicker,
      clearDates,
      isSelected,
      isHighlighted,
      selectDate,
      prevMonth,
      nextMonth,
      selectToday,
      handleDateInput,
    };
  },
};
</script>

<style>
.new_calendar_date_range_picker {
  flex-direction: column;
  align-items: center;
  width: 512px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
}

.new_calendar_date_picker_arrows{
  display: flex;
  align-items:  center;
}

.new_calendar_arrow{
  margin-bottom: 0px;
  margin-left: 4px;
  border-radius: 4px;
  border: 1px solid var(--Grey-200, #E6E7E8);
  background: var(--Grey-White, #FFF);
  box-shadow: 0px 1px 2px 0px rgba(26, 40, 53, 0.09); padding: 4px 8px;
}

.new_calendar_input_wrapper{
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
  padding: 6px; border: none;
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

#new_calendar_code_counter{
  border-radius: 4px; background: #449FF4; padding: 5px 7px; font-size: 12px; color: #fff; font-weight: 700; display: flex
}

#new_calendar_arrows_wrapper{
  display: flex; align-items: center; justify-content: space-between; width: 50%;
}

#new_calendar_select_today{
  font-size: 12px; font-weight: 600; border-radius: 4px;
  border: 1px solid var(--Grey-200, #E6E7E8);
  background: var(--Grey-White, #FFF);
  box-shadow: 0px 1px 2px 0px rgba(26, 40, 53, 0.09); padding: 8px;
}

.new_calendar_month {
  text-align: center;
  margin-bottom: 10px;
}

.new_calendar_days_of_week{
  margin-bottom: 10px;
}

.new_calendar_days, .new_calendar_days_of_week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}

.new_calendar_day {
  text-align: center;
  padding: 5px;
  /* margin: 2px; */
  cursor: pointer;
}

.new_calendar_day:hover{
  background: #03C191;
  transition: .1s ease-in-out;
}

.new_calendar_day.selected {
  background: #03C191;
  /* border-radius: 12px 0px 0px 12px; */
  color: #fff;
}

.new_calendar_day.highlighted {
  background-color: #D7FFED;
}
</style>
