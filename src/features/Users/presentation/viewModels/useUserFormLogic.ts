import React, { useState } from "react";
import { runInAction } from "mobx";
import { UserViewModel } from "./viewModelUser";

export const useUserFormLogic = (viewModel: UserViewModel) => {

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const habdleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        await viewModel.createUser();
        if (viewModel.isValid) {
            setTimeout(() => {
                setShowSuccessMessage(false);
                runInAction(() => (viewModel.isValid = false));
            }, 5000);
        };

    }

    return {
        habdleSubmit,
        showSuccessMessage,
    };

};



