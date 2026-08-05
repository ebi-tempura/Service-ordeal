def package_select():
    import random

    packages = ["package_A", "package_B", "package_C"]

    cost_A = [40,60,60,80]
    cost_B = [40,60,80,60,60]
    cost_C = [80]

    selected_package = random.choice(packages)

    if selected_package == "package_A":

        selected_service = random.choice(cost_A)

        time_spent = 10
    
        #print (f"selected service: ", selected_service)

    elif selected_package == "package_B":

        selected_service = random.choice(cost_B)

        time_spent = 15

        #print (f"selected service: ", selected_service)

    elif selected_package == "package_C":
        selected_service =random.choice(cost_C)

        time_spent = 20
        #print (f"selected service:", selected_service)
    
    return selected_package, selected_service, time_spent
