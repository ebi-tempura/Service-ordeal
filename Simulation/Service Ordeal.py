
from Functions import package_select, punishment, rest_period, pay_half, punishment_belowZero

print ("-"*50)
debt = 1500
print (f"Debt =", debt)

shift = input ("Enter the shift you are going to work: ")
print (f"The shift chosen is of {shift} hour(s)" )

shift_1 = [1, 60, 120, 90]
shift_2 = [2, 120, 240, 180]
shift_3 = [3, 180, 360, 210]

if shift == "1":
    selected_shift = shift_1
elif shift == "2":
    selected_shift = shift_2
elif shift == "3":
    selected_shift = shift_3
else:
    print("Invalid shift selection. Please choose 1, 2, or 3.")
    exit()
shift_time = selected_shift[1]
daily_fee = selected_shift[len(selected_shift) // 2]
extra_time = selected_shift[-1]


print (f"Shift time: {shift_time} minutes")
print (f"Daily fee: {daily_fee} dollars")
print (f"Extra fee: {extra_time} dollars")

print ("-"*50)

day = 0
time_spent = 0
time_shift = 0
earnings = 0
Total_earnings = 0
current_earnings = 0
pay_multiplier = 0


while Total_earnings < debt:
        
        day += 1
        Total_time = 0
        daily_earnings = 0
        masterlist = []
        time_spent_w_rest = 0

        print ("*"*50)
        print (f"Day {day}")
        print ("*"*50)

        while Total_time < shift_time:

            X = ""

            selected_package, selected_service, time_spent = package_select()
            pay_multiplier = pay_half(pay_multiplier)
            rest_time = rest_period()
            time_spent_w_rest = time_spent
            time_spent_w_rest += rest_time
            Total_time += time_spent_w_rest

            if Total_time + time_spent> shift_time + 15:

                 break

            selected_service = selected_service * pay_multiplier
            daily_earnings += selected_service

            if pay_multiplier == 0.5:

                X = "*"

            masterlist.append(f"Selected package: {selected_package} |" 
                              f"Selected service: {selected_service} |"
                              f"{X}|" 
                              f"Earnings: {daily_earnings} |"
                              f" Time spent: {time_spent} minutes |" 
                              f" Time rest: {rest_time} minutes |"
                              f" Total time: {Total_time} minutes ")


        print ("")
        print (*masterlist, sep="  \n")
        print ("")

        print (f"Earnings for the day: {daily_earnings}") 
        print ("-"*50)

        daily_earnings_after_punishment, pay_multiplier = punishment(selected_shift,pay_multiplier,daily_earnings,shift_time, Total_time)

        print ("")
#       print (f"**Daily earnings after punishment in the main script: {daily_earnings_after_punishment}")

        Total_earnings_after_punishment_and_fee = daily_earnings_after_punishment - daily_fee
        Total_earnings += Total_earnings_after_punishment_and_fee
  
        print ("")
        print ("-"*50)
        print (f"Daily fee: {daily_fee}")
        print(f"Daily earning after punishment and fee", Total_earnings_after_punishment_and_fee)

        if Total_earnings_after_punishment_and_fee <0:

                     daily_earnings_after_punishment, pay_multiplier = punishment_belowZero(selected_shift,pay_multiplier,daily_earnings,shift_time, Total_time)

        print(f"Total earnings", Total_earnings)

        print ("")






  
   