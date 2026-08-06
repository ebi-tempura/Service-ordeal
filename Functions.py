
import random

def package_select():

    packages = ["package_A", "package_B", "package_C"]

    cost_A = [40,60,60,80]
    cost_B = [40,60,80,60,60]
    cost_C = [80]

    selected_package = random.choice(packages)

    if selected_package == "package_A":

        selected_service = random.choice(cost_A)

        time_spent = 10
    
    elif selected_package == "package_B":

        selected_service = random.choice(cost_B)

        time_spent = 15

    elif selected_package == "package_C":
        selected_service =random.choice(cost_C)

        time_spent = 20
    
    return selected_package, selected_service, time_spent

def rest_period():

    randnom_rest_time = random.randint(1, 9)

    if randnom_rest_time >= 5:   
        rest_time = 5 
        #print (f"Rest period: {rest_time}")

    else:
        rest_time = 0

        #print ("No rest period")

    return rest_time

def pay_half ():
    random_half_pay = random.randint(0, 9)

    #print (f"Random half pay: {random_half_pay}")

    if random_half_pay == 0:
        pay_multiplier = 2
    else:
        pay_multiplier = 1

    return pay_multiplier

def punishment_selector(current_earnings,selected_shift):
    random_punishment = random.randint(0, 9)
    total_time = 0
    extra_earnings = 0      

    if random_punishment == 7:
        print("You have to work in a bad part of town; half your earnings will be stolen.")
        return extra_earnings // 2

    elif random_punishment == 8:
        print("You have been robbed.")
        return 0

    elif random_punishment == 0:
        print("You have to work an extra shift.")

        shift_time = selected_shift[1]
        total_time = 0
        extra_earnings = 0
        current_earnings = 0
        masterlist_extra = []

        while total_time < shift_time:
            selected_package, selected_service, time_spent = package_select()

            rest_time = rest_period()
            time_spent += rest_time

           # current_earnings += extra_earnings

            total_time += time_spent
            extra_earnings += selected_service

            masterlist_extra.append(
                f"Selected package: {selected_package} | "
                f"Selected service: {selected_service} | "
                f"Time spent: {time_spent} minutes | "
                f"Rest time: {rest_time} minutes | "
                f"Total time: {total_time} minutes | "
                f"Earnings: {selected_service}"
            )
        extra_fee = selected_shift[-1]
        print(*masterlist_extra, sep="\n")

        print("")
        print(f"Extra-shift earnings: {extra_earnings}")
        print(f"Extra-shift fee: {extra_fee}")

        total_extra_earnings = extra_earnings - extra_fee

        print(f"Extra-shift earnings after fee: {total_extra_earnings}")

        current_earnings = total_extra_earnings

        return current_earnings

    else:
        print("No monetary punishment.")

        return current_earnings


def punishment(current_earnings,selected_shift):
    random_punishment = random.randint(0, 9)

    if random_punishment < 5:
        print("You have been punished twice today.")
        current_earnings = punishment_selector(current_earnings, selected_shift)
        current_earnings = punishment_selector(current_earnings, selected_shift)
    elif random_punishment >= 5:
        print("You have been punished once today.")
        current_earnings = punishment_selector(current_earnings, selected_shift)
    else:
        print("No punishment today.")

    return current_earnings