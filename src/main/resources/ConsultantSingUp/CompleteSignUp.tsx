import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, CircularProgress, Grid, Paper } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';

import { authApi } from '../../API/AuthApi';
import { specializationsApi } from '../../API/SpecializationsApi';
import { useNotification } from '../../context/NotificationProvider';
import AddressSection from './AddressSection';
import BioSection from './BioSection';
import CredentialsSection from './CredentialsSection';
import SpecializationsSection from './Specializations';

const steps = ['Bio', 'Address', 'Specializations', 'Credentials'];

export interface SignUpFormValues {
  shortBio: string;
  longBio: string;
  pricePerConsultation: string;
  currency: string;
  profilePicture: FileList | null;
  certifications: {
    type: string;
    certification: string;
    certificateFile: FileList | null;
  }[];
  streetAddress: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  specializations: string[];
  services: string[];
}
export interface CertificationWithoutFile {
  type: string;
  certification: string;
}

export interface FileKeyValuePair {
  key: string;
  value: File;
}

export interface SignUpFormValuesWithoutFiles {
  shortBio: string;
  longBio: string;
  certifications: CertificationWithoutFile[];
  streetAddress: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  specializations: string[];
  services: string[];
}

export interface SpecializationsObject {
  title: string;
  roleId: number;
}

export const CompleteSignUp = () => {
  const { confirmationCode } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [specializationsOptions, setSpecializationsOptions] = useState<
    SpecializationsObject[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tokenStatus, setTokenStatus] = useState<string>('');
  const isLastStep = () => {
    return steps.indexOf(currentStep) === steps.length - 1;
  };
  useEffect(() => {
    authApi
      .getTokenStatus(confirmationCode)
      .then((response) => setTokenStatus(response))
      .finally(() => setLoading(false));
    specializationsApi.getAllSpecializations().then((response) => {
      setSpecializationsOptions(response);
    });
  }, []);

  const handleNext = (e: any) => {
    e.preventDefault();
    const currentStepIndex = steps.indexOf(currentStep);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1]);
    }
  };

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    getValues,
  } = useForm<SignUpFormValues>({
    shouldUnregister: false,
    defaultValues: {
      certifications: [
        { type: '', certification: '', certificateFile: undefined },
      ],
      specializations: [],
    },
  });
  const onSubmit = (data: SignUpFormValues) => {
    const dataWithoutFiles: SignUpFormValuesWithoutFiles = {
      ...data,
      certifications: data.certifications.map(({ type, certification }) => ({
        type,
        certification,
      })),
    };

    const fileKeyValuePairs: FileKeyValuePair[] = data.certifications
      .filter((cert) => cert.certificateFile && cert.certificateFile.length > 0)
      .map((cert) => {
        const file = cert.certificateFile as FileList;
        return {
          key: `Certification - ${cert.type}: ${cert.certification}`,
          value: file[0],
        };
      });
    const formData = new FormData();

    fileKeyValuePairs.forEach((pair) => {
      formData.append(pair.key, pair.value);
    });
    formData.append('id', confirmationCode ? confirmationCode : '');
    const pictureFormData = new FormData();
    pictureFormData.append('id', confirmationCode ? confirmationCode : '');
    if (profilePicture != null) {
      pictureFormData.append('image', profilePicture);
    }
    authApi
      .postDetails(confirmationCode, dataWithoutFiles)
      .then((response) => {
        return Promise.all([
          authApi.postCertFile(formData),
          authApi.postImageFile(pictureFormData),
        ]);
      })
      .then(([certFileResponse, imageFileResponse]) => {
        showNotification(
          true,
          'success',
          'SignUp Success',
          'Your request is pending verification, please check your email for your request status.'
        );
        navigate('/');
      })
      .catch((error) => {
        showNotification(
          true,
          'failed',
          'Unable To Register Request',
          error.response.data
        );
      });
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certifications',
  });

  const renderStepContent = (step: string) => {
    switch (step) {
      case 'Bio':
        return (
          <BioSection
            register={register}
            errors={errors}
            setProfilePicture={setProfilePicture}
          />
        );
      case 'Credentials':
        return (
          <CredentialsSection
            register={register}
            control={control}
            fields={fields}
            append={append}
            remove={remove}
          />
        );
      case 'Address':
        return <AddressSection register={register} errors={errors} />;
      case 'Specializations':
        return (
          <SpecializationsSection
            register={register}
            specializationsOptions={specializationsOptions}
          />
        );
      default:
        return null;
    }
  };
  const isStepActive = (step: string) => currentStep === step;

  const renderStatusMessage = () => {
    if (
      tokenStatus === 'VERIFICATION_IN_PROGRESS' ||
      tokenStatus === 'EXPIRED' ||
      tokenStatus === 'INVALID'
    ) {
      return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {tokenStatus === 'VERIFICATION_IN_PROGRESS'
            ? 'Your account confirmation is pending.'
            : 'Your account confirmation token is invalid or may have expired.'}
        </div>
      );
    }
    return null;
  };

  return loading ? (
    <CircularProgress />
  ) : (
    renderStatusMessage() || (
      <Grid
        container
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        style={{ padding: '20px' }}
      >
        {/* Side Menu for Steps */}
        <Grid item xs={12} sm={3}>
          <Paper
            elevation={3}
            style={{
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              height: 'fit-content',
            }}
          >
            {steps.map((step) => (
              <Button
                key={step}
                onClick={() => setCurrentStep(step)}
                style={{
                  marginBottom: '10px',
                  backgroundColor: isStepActive(step) ? 'lightblue' : 'white',
                  color: isStepActive(step) ? 'black' : 'grey',
                }}
              >
                {step}
              </Button>
            ))}
          </Paper>
        </Grid>

        {/* Step Content */}
        <Grid item xs={12} sm={9}>
          <Paper
            elevation={3}
            style={{
              padding: '20px',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }}
              style={{ width: '100%' }}
            >
              {renderStepContent(currentStep)}

              {/* Separate Section for Button */}
              <div style={{ textAlign: 'right', marginTop: '20px' }}>
                {isLastStep() ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '20px' }}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    style={{ marginTop: '20px' }}
                  >
                    Next
                  </Button>
                )}
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    )
  );
};
